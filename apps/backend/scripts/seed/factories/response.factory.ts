import { SurveyService } from '../../../src/modules/survey/survey.service'
import { Survey } from '../../../src/modules/survey/schemas/survey.schema'
import { Device } from '../../../src/modules/device/schemas/device.schema'
import { CreateSurveyResponseDto } from '../../../src/modules/survey/dto/create-survey-response.dto'
import { SurveyResponse } from '../../../src/modules/survey/schemas/survey-response.schema'
import { QuestionType } from '../../../src/modules/survey/types/question.types'
import { faker } from '@faker-js/faker'

/*
 * Creates survey responses for the given surveys and devices.
 * @surveyService - The SurveyService instance to use for creating responses.
 * @surveys - The surveys to create responses for.
 * @devices - The devices to create responses for.
 * @return A promise that resolves to an array of created survey responses.
 */
export async function createResponses(
    surveyService: SurveyService,
    surveys: Survey[],
    devices: Device[]
): Promise<SurveyResponse[]> {
    const responses: SurveyResponse[] = []

    for (const survey of surveys) {
        const count = faker.number.int({ min: 1, max: devices.length })
        const respondents = faker.helpers.arrayElements(devices, count)
        for (const device of respondents) {
            const answers = survey.questions.map((q) => {
                let answer: string | string[]
                if (q.type === QuestionType.SINGLE_CHOICE) {
                    answer = faker.helpers.arrayElement(q.options!)
                } else if (q.type === QuestionType.MULTIPLE_CHOICE) {
                    const picks = faker.number.int({
                        min: 1,
                        max: q.options!.length,
                    })
                    answer = faker.helpers.arrayElements(q.options!, picks)
                } else {
                    answer = faker.lorem.sentence()
                }
                return { questionId: q._id.toString(), answer }
            })
            const dto: CreateSurveyResponseDto = { answers }
            const response = await surveyService.submitSurveyResponse(
                survey._id.toString(),
                device.deviceId,
                dto
            )
            responses.push(response)
        }
    }

    return responses
}
