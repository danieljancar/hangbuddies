import { faker } from '@faker-js/faker'
import { SurveyService } from '../../../src/modules/survey/survey.service'
import { SurveyDocument } from '../../../src/modules/survey/schemas/survey.schema'
import { DeviceDocument } from '../../../src/modules/device/schemas/device.schema'
import { SurveyResponse } from '../../../src/modules/survey/schemas/survey-response.schema'
import { QuestionType } from '../../../src/modules/survey/types/question.types'

export async function createResponses(
    surveyService: SurveyService,
    surveys: SurveyDocument[],
    devices: DeviceDocument[]
): Promise<SurveyResponse[]> {
    const responses: SurveyResponse[] = []

    for (const survey of surveys) {
        const respondents = faker.helpers.arrayElements(
            devices,
            faker.number.int({ min: 1, max: devices.length })
        )
        for (const device of respondents) {
            const answers = survey.questions.map((q) => {
                let answer: string | string[]
                if (q.type === QuestionType.SINGLE_CHOICE) {
                    answer = faker.helpers.arrayElement(q.options ?? [])
                } else if (q.type === QuestionType.MULTIPLE_CHOICE) {
                    const picks = faker.number.int({
                        min: 1,
                        max: q.options?.length ?? 1,
                    })
                    answer = faker.helpers.arrayElements(q.options ?? [], picks)
                } else {
                    answer = faker.lorem.sentence()
                }
                return { questionId: q._id.toString(), answer }
            })

            const dto = { answers }
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
