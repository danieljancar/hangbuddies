import { faker } from '@faker-js/faker'
import { SurveyService } from '../../../src/modules/survey/survey.service'
import { StatusType } from '../../../src/modules/survey/types/status.types'
import { QuestionType } from '../../../src/modules/survey/types/question.types'
import { SurveyDocument } from '../../../src/modules/survey/schemas/survey.schema'

export async function createSurveys(
    surveyService: SurveyService,
    amount: number,
    deviceId: string
): Promise<SurveyDocument[]> {
    return Promise.all(
        Array.from({ length: amount }).map(() => {
            const questions = Array.from({
                length: faker.number.int({ min: 1, max: 5 }),
            }).map(() => {
                const type = faker.helpers.arrayElement([
                    QuestionType.TEXT,
                    QuestionType.SINGLE_CHOICE,
                    QuestionType.MULTIPLE_CHOICE,
                ])

                const options =
                    type === QuestionType.SINGLE_CHOICE ||
                    type === QuestionType.MULTIPLE_CHOICE
                        ? Array.from({
                              length: faker.number.int({ min: 2, max: 5 }),
                          }).map(() =>
                              faker.lorem.words(
                                  faker.number.int({ min: 1, max: 4 })
                              )
                          )
                        : undefined

                return {
                    text: faker.lorem.sentence() + '?',
                    type,
                    options,
                    isRequired: faker.datatype.boolean(),
                }
            })

            return surveyService.createSurvey(deviceId, {
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
        })
    )
}
