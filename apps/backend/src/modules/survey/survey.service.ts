import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Survey, SurveyDocument } from './schemas/survey.schema'
import {
    SurveyResponse,
    SurveyResponseDocument,
} from './schemas/survey-response.schema'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto'
import { SurveyQuestion } from './schemas/survey-question.schema'
import { DeviceService } from '../device/device.service'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'
import { QuestionType } from './types/question.types'

@Injectable()
export class SurveyService {
    constructor(
        @InjectModel(Survey.name)
        private readonly surveyModel: Model<SurveyDocument>,
        @InjectModel(SurveyResponse.name)
        private readonly surveyResponseModel: Model<SurveyResponseDocument>,
        private readonly deviceService: DeviceService,
        private readonly logService: LogService
    ) {}

    async createSurvey(
        deviceId: string,
        dto: CreateSurveyDto
    ): Promise<SurveyDocument> {
        const device = await this.deviceService.recordSubmission(deviceId)
        const survey = new this.surveyModel({ ...dto, deviceId: device._id })
        return survey.save()
    }

    async getSurveys(): Promise<SurveyDocument[]> {
        return this.surveyModel.find().exec()
    }

    async getSurveyById(id: string): Promise<SurveyDocument> {
        const survey = await this.surveyModel.findById(id).exec()
        if (!survey) {
            throw new NotFoundException(`Survey with id ${id} not found`)
        }
        return survey
    }

    async getSurveyQuestions(id: string): Promise<SurveyQuestion[]> {
        const survey = await this.getSurveyById(id)
        return survey.questions
    }

    async submitSurveyResponse(
        surveyId: string,
        deviceId: string,
        dto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        const survey = await this.getSurveyById(surveyId)
        await this.validateSurveyResponses(survey, dto, deviceId)

        const device = await this.deviceService.recordSubmission(deviceId)
        const answers = dto.answers.map((a) => ({
            questionId: new Types.ObjectId(a.questionId),
            answer: a.answer,
        }))

        const response = new this.surveyResponseModel({
            surveyId: survey._id,
            deviceId: device._id,
            answers,
        })
        const saved = await response.save()
        await this.logService.log(
            `Survey response created for survey ${surveyId}`,
            LogCategoryType.SURVEY,
            { deviceId }
        )
        return saved
    }

    async getSurveyResponses(surveyId: string): Promise<SurveyResponse[]> {
        const survey = await this.getSurveyById(surveyId)
        const list = await this.surveyResponseModel
            .find({ surveyId: survey._id })
            .exec()
        if (!list.length) {
            throw new NotFoundException(`No responses for survey ${surveyId}`)
        }
        return list
    }

    private async validateSurveyResponses(
        survey: SurveyDocument,
        dto: CreateSurveyResponseDto,
        deviceId: string
    ): Promise<void> {
        const validIds = survey.questions.map((q) => q.id)
        const answeredIds = dto.answers.map((a) => a.questionId)

        for (const question of survey.questions) {
            if (question.isRequired && !answeredIds.includes(question.id)) {
                throw new BadRequestException(
                    `Required question ${question.id} was not answered`
                )
            }
        }

        for (const answer of dto.answers) {
            if (!validIds.includes(answer.questionId)) {
                throw new BadRequestException(
                    `Question ${answer.questionId} not in survey`
                )
            }
            const question = survey.questions.find(
                (q) => q.id === answer.questionId
            )
            if (!question) continue

            if (question.type === QuestionType.SINGLE_CHOICE) {
                if (
                    typeof answer.answer !== 'string' ||
                    question.options === undefined ||
                    !question.options.includes(answer.answer)
                ) {
                    throw new BadRequestException(
                        `Invalid answer for question ${question.id}`
                    )
                }
            } else if (question.type === QuestionType.MULTIPLE_CHOICE) {
                if (
                    !Array.isArray(answer.answer) ||
                    question.options === undefined ||
                    answer.answer.some(
                        (val) => !question.options!.includes(val)
                    )
                ) {
                    throw new BadRequestException(
                        `Invalid answers for question ${question.id}`
                    )
                }
            }
        }
    }
}
