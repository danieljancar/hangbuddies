import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map, switchMap, catchError, of } from 'rxjs'
import { LocalStorageService } from '../utils/local-storage.service'
import { LOCAL_STORAGE_KEYS } from '../common/storage.constants'
import { DeviceIdService } from './device-id.service'
import { environment } from '../../environments/environment'

export interface BackendSurveyQuestion {
    id: string
    text: string
    type: number
    options: string[]
    isRequired: boolean
}

export interface BackendSurvey {
    id: string
    title: string
    description: string
    deviceId: string
    questions: BackendSurveyQuestion[]
    meta: {
        isHidden: boolean
        status: number
        voteCount: number
        viewCount: number
    }
    createdAt: string
    updatedAt: string
}

export interface BackendSurveyAnswer {
    questionId: string
    answer: string | string[]
}

export interface BackendSurveyResponse {
    id: string
    surveyId: string
    deviceId: string
    answers: BackendSurveyAnswer[]
    createdAt: string
    updatedAt: string
}

export interface CombinedSurveyQuestion extends BackendSurveyQuestion {
    responses: {
        text: string
        count: number
        percentage: number
        isHighest: boolean
    }[]
}

export interface CombinedSurvey extends BackendSurvey {
    questions: CombinedSurveyQuestion[]
    responseCount: number
}

export interface CastVoteAnswer {
    questionId: string
    answer: string | string[]
}

export interface BackendDevice {
    _id: string
    deviceId: string
    lastActive: string
    totalSubmissions: number
}

@Injectable({ providedIn: 'root' })
export class SurveyService {
    private readonly API_HOST = `${environment.apiUrl}/surveys`

    constructor(
        private http: HttpClient,
        private localstorage: LocalStorageService,
        private deviceIdService: DeviceIdService
    ) {}

    getSurvey(id: string): Observable<BackendSurvey> {
        return this.http.get<BackendSurvey>(`${this.API_HOST}/${id}`)
    }

    getSurveyResponses(id: string): Observable<BackendSurveyResponse[]> {
        return this.http.get<BackendSurveyResponse[]>(
            `${this.API_HOST}/${id}/responses`
        )
    }

    checkIfDeviceHasVoted(surveyId: string): Observable<boolean> {
        const deviceId: string | null = this.localstorage.get(
            LOCAL_STORAGE_KEYS.DEVICE.ID
        )

        if (!deviceId) {
            return of(false)
        }

        return this.deviceIdService.getDeviceFromBackend(deviceId).pipe(
            switchMap((device: BackendDevice) => {
                return this.getSurveyResponses(surveyId).pipe(
                    map((responses) => {
                        return responses.some(
                            (response) => response.deviceId === device._id
                        )
                    })
                )
            }),
            catchError((error) => {
                console.error('Error checking device vote:', error)
                return of(false)
            })
        )
    }

    getCombinedSurvey(id: string): Observable<CombinedSurvey> {
        const survey$ = this.getSurvey(id)
        const responses$ = this.getSurveyResponses(id)

        return forkJoin([survey$, responses$]).pipe(
            map(([survey, responses]) => {
                const questionAnswerMap: Record<string, (string | string[])[]> =
                    {}

                // Sammle alle Antworten gruppiert nach Frage-ID
                for (const response of responses) {
                    for (const answer of response.answers) {
                        if (!questionAnswerMap[answer.questionId]) {
                            questionAnswerMap[answer.questionId] = []
                        }
                        questionAnswerMap[answer.questionId].push(answer.answer)
                    }
                }

                const totalResponses = responses.length

                const combinedQuestions: CombinedSurveyQuestion[] =
                    survey.questions.map((question) => {
                        const rawAnswers = questionAnswerMap[question.id] || []
                        const flatAnswers: string[] = rawAnswers.flatMap((a) =>
                            Array.isArray(a) ? a : [a]
                        )

                        // Zähle, wie oft jede Option gewählt wurde
                        let responseStats

                        if (question.type === 1) {
                            // Text answer
                            responseStats = flatAnswers.map((answer) => {
                                const count = flatAnswers.filter(
                                    (a) => a === answer
                                ).length
                                const percentage =
                                    totalResponses > 0
                                        ? (count / totalResponses) * 100
                                        : 0

                                return {
                                    text: answer,
                                    count,
                                    percentage,
                                    isHighest: false,
                                }
                            })
                        } else {
                            responseStats = question.options.map(
                                (optionText) => {
                                    const count = flatAnswers.filter(
                                        (a) => a === optionText
                                    ).length
                                    const percentage =
                                        totalResponses > 0
                                            ? (count / totalResponses) * 100
                                            : 0

                                    return {
                                        text: optionText,
                                        count,
                                        percentage,
                                        isHighest: false,
                                    }
                                }
                            )

                            // Bestimme den höchsten Wert
                            const maxCount = Math.max(
                                ...responseStats.map((r) => r.count)
                            )

                            // Markiere alle mit dem höchsten Wert (kann mehrere sein bei Gleichstand)
                            responseStats.forEach((r) => {
                                r.isHighest =
                                    r.count === maxCount && maxCount > 0
                            })
                        }

                        return {
                            ...question,
                            responses: responseStats,
                        }
                    })

                return {
                    ...survey,
                    questions: combinedQuestions,
                    responseCount: totalResponses,
                }
            })
        )
    }

    submitVotes(
        surveyId: string,
        answers: CastVoteAnswer[]
    ): Observable<BackendSurvey> {
        return this.http.post<BackendSurvey>(
            `${this.API_HOST}/${surveyId}/respond`,
            { answers: answers },
            {
                headers: {
                    'x-device-id':
                        this.localstorage.get(LOCAL_STORAGE_KEYS.DEVICE.ID) ||
                        '',
                },
            }
        )
    }
}
