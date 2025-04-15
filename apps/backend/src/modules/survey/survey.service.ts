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

@Injectable()
export class SurveyService {
    constructor(
        @InjectModel(Survey.name)
        private readonly surveyModel: Model<SurveyDocument>,
        @InjectModel(SurveyResponse.name)
        private readonly surveyResponseModel: Model<SurveyResponseDocument>
    ) {}

    async createSurvey(createSurveyDto: CreateSurveyDto): Promise<Survey> {
        const survey = new this.surveyModel(createSurveyDto)
        return survey.save()
    }

    async getSurveys(): Promise<Survey[]> {
        return this.surveyModel.find().exec()
    }

    async getSurveyById(id: string): Promise<Survey> {
        const survey = await this.surveyModel.findById(id).exec()
        if (!survey) {
            throw new NotFoundException(`Survey with id ${id} not found`)
        }
        return survey
    }

    async submitSurveyResponse(
        createSurveyResponseDto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        const survey = await this.surveyModel
            .findById(createSurveyResponseDto.surveyId)
            .exec()
        if (!survey) {
            throw new NotFoundException(
                `Survey with id ${createSurveyResponseDto.surveyId} not found`
            )
        }

        const mappedAnswers = createSurveyResponseDto.answers.map(
            (answerDto) => ({
                questionId: new Types.ObjectId(answerDto.questionId),
                answer: answerDto.answer,
            })
        )

        const surveyResponse = new this.surveyResponseModel({
            surveyId: new Types.ObjectId(createSurveyResponseDto.surveyId),
            deviceId: createSurveyResponseDto.deviceId,
            answers: mappedAnswers,
        })
        return surveyResponse.save()
    }
}
