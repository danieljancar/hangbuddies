import { Injectable, NotFoundException } from '@nestjs/common'
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

        const mappedAnswers = createSurveyResponseDto.answers.map(
            (answerDto) => ({
                questionId: new Types.ObjectId(answerDto.questionId),
                answer: answerDto.answer,
            })
        )

        const device = await this.deviceService.recordSubmission(deviceId)

        const surveyResponse = new this.surveyResponseModel({
            surveyId: new Types.ObjectId(surveyId),
            device: device._id as Types.ObjectId,
            answers: mappedAnswers,
        })
        return surveyResponse.save()
    }
}
