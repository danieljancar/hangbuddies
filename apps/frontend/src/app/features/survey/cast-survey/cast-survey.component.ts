import { Component, inject, OnInit } from '@angular/core'
import { CastQuestionComponent } from './cast-question/cast-question.component'
import { MatDivider } from '@angular/material/divider'
import { MatIcon } from '@angular/material/icon'
import {
    BackendSurvey,
    CastVoteAnswer,
    SurveyService,
} from '../../../core/survey.service'
import { ActivatedRoute, Router } from '@angular/router'
import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import {
    DialogComponent,
    DialogData,
} from '../../../shared/components/dialog/dialog.component'
import { MatButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-cast-survey',
    imports: [
        MatIcon,
        CastQuestionComponent,
        MatDivider,
        DatePipe,
        MatButton,
        MatProgressSpinner,
    ],
    templateUrl: './cast-survey.component.html',
    standalone: true,
    styleUrl: './cast-survey.component.scss',
})
export class CastSurveyComponent implements OnInit {
    survey: BackendSurvey = {} as BackendSurvey
    isLoading: boolean = true
    hasAlreadyVoted = false

    private answers: CastVoteAnswer[] = []
    isFinished = false

    private dialog = inject(MatDialog)

    constructor(
        private readonly surveyService: SurveyService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        const surveyId = this.route.snapshot.paramMap.get('id')
        const hasAlreadyVoted = this.surveyService.checkIfDeviceHasVoted(
            surveyId!
        )

        hasAlreadyVoted.subscribe((hasVoted) => {
            if (hasVoted) {
                this.hasAlreadyVoted = true
            }

            this.surveyService.getSurvey(surveyId!).subscribe({
                next: (survey: BackendSurvey) => {
                    this.survey = survey
                    this.isLoading = false
                },
                error: (error) => {
                    console.error('Error fetching survey:', error)
                    this.isLoading = false
                },
            })
        })
    }

    castVote(questionAnswer: CastVoteAnswer) {
        const existingAnswerIndex = this.answers.findIndex(
            (answer) => answer.questionId === questionAnswer.questionId
        )

        if (existingAnswerIndex !== -1) {
            this.answers[existingAnswerIndex] = questionAnswer
        } else {
            this.answers.push(questionAnswer)
        }

        this.isFinished = this.checkIfFinished()
    }

    checkIfFinished(): boolean {
        if (this.isFinished) return true

        this.isFinished = this.survey.questions.every((question) => {
            const answer = this.answers.find(
                (a) => a.questionId === question.id
            )
            return (
                answer &&
                (typeof answer.answer === 'string'
                    ? answer.answer.trim() !== ''
                    : answer.answer.length > 0)
            )
        })

        return this.isFinished
    }

    submitVotes() {
        const data: DialogData = {
            title: 'Votes submitting',
            message:
                'Your votes have been successfully submitted. \n Would you like to view the results?',
            confirmText: 'View Results',
            cancelText: 'Close',
            isLoading: true,
        }

        const dialogRef = this.dialog.open(DialogComponent, {
            data,
            disableClose: true,
        })
        dialogRef.componentInstance.toggleLoading(true) // Safe now

        this.surveyService.submitVotes(this.survey.id, this.answers).subscribe({
            next: (response) => {
                if (response) {
                    dialogRef.componentInstance.toggleLoading(false)
                    dialogRef.componentInstance.onConfirm = () => {
                        dialogRef.close()
                        this.router.navigate(['/survey', this.survey.id])
                    }
                    dialogRef.componentInstance.onCancel = () => {
                        dialogRef.close()
                        window.location.reload()
                    }
                }
            },
            error: (error) => {
                console.error('Error submitting votes:', error)
                dialogRef.close() // close current dialog if needed

                const errorData: DialogData = {
                    title: 'Submission Error',
                    message:
                        'An error occurred while submitting your votes. Please try again later.',
                    confirmText: 'Close',
                }
                this.dialog.open(DialogComponent, { data: errorData })
            },
        })
    }

    goBack() {
        this.router.navigate(['/survey', this.survey.id])
    }
}
