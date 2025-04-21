import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SurveyResponse } from './schemas/survey-response.schema'
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto'
import { Survey } from './schemas/survey.schema'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { SurveyService } from './survey.service'
import { DeviceId } from '../../common/decorators/device.decorator'
import { SurveyQuestion } from './schemas/survey-question.schema'

@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    async createSurvey(
        @DeviceId() deviceId: string,
        @Body() createSurveyDto: CreateSurveyDto
    ): Promise<Survey> {
        return this.surveyService.createSurvey(deviceId, createSurveyDto)
    }

    @Get()
    async getSurveys(): Promise<Survey[]> {
        return this.surveyService.getSurveys()
    }

    @Get(':surveyId')
    async getSurvey(@Param('surveyId') id: string): Promise<Survey> {
        return this.surveyService.getSurveyById(id)
    }

    @Get(':surveyId/questions')
    async getSurveyQuestions(
        @Param('surveyId') id: string
    ): Promise<SurveyQuestion[]> {
        return this.surveyService.getSurveyQuestions(id)
    }

    @Post(':surveyId/responses')
    async submitResponse(
        @DeviceId() deviceId: string,
        @Param('surveyId') surveyId: string,
        @Body() createSurveyResponseDto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        return this.surveyService.submitSurveyResponse(
            surveyId,
            deviceId,
            createSurveyResponseDto
        )
    }
}
