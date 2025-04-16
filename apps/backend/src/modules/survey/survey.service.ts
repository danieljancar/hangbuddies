import {
    BadRequestException,
    Injectable,
    NotFoundException,
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
import { DeviceService } from '../../utils/device/device.service'
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
        createSurveyDto: CreateSurveyDto
    ): Promise<Survey> {
        const survey = new this.surveyModel({
            ...createSurveyDto,
            deviceId,
        })
        await this.deviceService.recordSubmission(deviceId)
        return survey.save()
    }

    async getSurveys(): Promise<Survey[]> {
        return this.surveyModel.find().exec()
    }

    async getSurveyById(id: string): Promise<Survey> {
        const survey = await this.surveyModel.findById(id).exec()
        if (!survey) {
            await this.logService.warn(
                `Survey with id ${id} not found`,
                LogCategoryType.SURVEY
            )
            throw new NotFoundException(`Survey with id ${id} not found`)
        }
        return survey
    }

    async submitSurveyResponse(
        surveyId: string,
        deviceId: string,
        createSurveyResponseDto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        const survey = await this.surveyModel.findById(surveyId).exec()
        if (!survey) {
            await this.logService.warn(
                `Survey with id ${surveyId} not found`,
                LogCategoryType.SURVEY
            )
            throw new NotFoundException(`Survey with id ${surveyId} not found`)
        }

        await this.validateSurveyResponses(
            survey,
            createSurveyResponseDto,
            deviceId
        )

        const mappedAnswers = createSurveyResponseDto.answers.map(
            (answerDto) => ({
                questionId: new Types.ObjectId(answerDto.questionId),
                answer: answerDto.answer,
            })
        )

        const deviceRecord = await this.deviceService.recordSubmission(deviceId)

        const surveyResponse = new this.surveyResponseModel({
            surveyId: new Types.ObjectId(surveyId),
            device: deviceRecord._id as Types.ObjectId,
            answers: mappedAnswers,
        })
        const savedResponse = await surveyResponse.save()

        await this.logService.log(
            `Survey response created for survey id ${surveyId} by device ${deviceId}`,
            LogCategoryType.SURVEY,
            { deviceId }
        )
        return savedResponse
    }

    private async validateSurveyResponses(
        survey: SurveyDocument,
        responseDto: CreateSurveyResponseDto,
        deviceId: string
    ): Promise<void> {
        const validQuestionIds = survey.questions.map((q) => q._id.toString())
        const answeredQuestionIds = new Set(
            responseDto.answers.map((a) => a.questionId)
        )

        for (const question of survey.questions) {
            if (
                question.isRequired &&
                !answeredQuestionIds.has(question._id.toString())
            ) {
                await this.logService.warn(
                    `Required question with id ${question._id} was not answered`,
                    LogCategoryType.SURVEY,
                    { deviceId }
                )
                throw new BadRequestException(
                    `Required question with id ${question._id} was not answered`
                )
            }
        }

        for (const answer of responseDto.answers) {
            if (!validQuestionIds.includes(answer.questionId)) {
                await this.logService.warn(
                    `Question with id ${answer.questionId} is not part of survey ${survey._id}`,
                    LogCategoryType.SURVEY,
                    { deviceId }
                )
                throw new BadRequestException(
                    `Question with id ${answer.questionId} is not part of survey ${survey._id}`
                )
            }

            const question = survey.questions.find(
                (q) => q._id.toString() === answer.questionId
            )
            if (question) {
                switch (question.type) {
                    case QuestionType.SINGLE_CHOICE: {
                        if (typeof answer.answer !== 'string') {
                            await this.logService.warn(
                                `Expected a string answer for question ${question._id}`,
                                LogCategoryType.SURVEY,
                                { deviceId }
                            )
                            throw new BadRequestException(
                                `Expected a string answer for question ${question._id}`
                            )
                        }
                        if (
                            question.options &&
                            !question.options.includes(answer.answer)
                        ) {
                            await this.logService.warn(
                                `Answer "${answer.answer}" is not a valid option for question ${question._id}`,
                                LogCategoryType.SURVEY,
                                { deviceId }
                            )
                            throw new BadRequestException(
                                `Answer "${answer.answer}" is not a valid option for question ${question._id}`
                            )
                        }
                        break
                    }
                    case QuestionType.MULTIPLE_CHOICE: {
                        if (!Array.isArray(answer.answer)) {
                            await this.logService.warn(
                                `Expected an array answer for question ${question._id}`,
                                LogCategoryType.SURVEY,
                                { deviceId }
                            )
                            throw new BadRequestException(
                                `Expected an array answer for question ${question._id}`
                            )
                        }
                        if (
                            question.options &&
                            !answer.answer.every((a) =>
                                question.options?.includes(a)
                            )
                        ) {
                            await this.logService.warn(
                                `One or more answers for question ${question._id} are not valid options`,
                                LogCategoryType.SURVEY,
                                { deviceId }
                            )
                            throw new BadRequestException(
                                `One or more answers for question ${question._id} are not valid options`
                            )
                        }
                        break
                    }
                    default:
                        break
                }
            }
        }
    }
}
