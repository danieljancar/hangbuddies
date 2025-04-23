import { SurveyService } from '../../../src/modules/survey/survey.service'
import { faker } from '@faker-js/faker'
import {
    QuestionEnumType,
    QuestionType,
} from '../../../src/modules/survey/types/question.types'
import { StatusType } from '../../../src/modules/survey/types/status.types'

/*
 * Creates a number of surveys using the SurveyService.
 * @surveyService - The SurveyService instance to use for creating surveys.
 * @amount - The number of surveys to create.
 * @deviceId - The device ID to associate with the surveys.
 * @return A promise that resolves to an array of created surveys.
 */
export async function createSurveys(
    surveyService: SurveyService,
    amount: number,
    deviceId: string
) {
    const tasks = []

    for (let i = 0; i < amount; i++) {
        const questionCount = Math.floor(Math.random() * 5) + 1
        const questions: {
            text: string
            type: QuestionEnumType
            options?: string[]
            isRequired: boolean
        }[] = []

        for (let j = 0; j < questionCount; j++) {
            const type = faker.helpers.arrayElement(
                Object.values(QuestionType)
            ) as QuestionEnumType
            const options =
                type === QuestionType.MULTIPLE_CHOICE ||
                type === QuestionType.SINGLE_CHOICE
                    ? Array.from({ length: 4 }, () =>
                          faker.lorem.words(Math.floor(Math.random() * 4) + 1)
                      )
                    : undefined

            questions.push({
                text: faker.lorem.sentence() + '?',
                type,
                options,
                isRequired: faker.datatype.boolean(),
            })
        }

        tasks.push(
            surveyService.createSurvey(deviceId, {
                title: faker.lorem.words(5),
                description: faker.lorem.sentence(),
                questions,
                meta: {
                    status: StatusType.PUBLISHED,
                    isHidden: false,
                    voteCount: 0,
                    viewCount: 0,
                },
            })
        )
    }

    return Promise.all(tasks)
}
