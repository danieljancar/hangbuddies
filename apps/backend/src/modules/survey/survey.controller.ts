import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { SurveyService } from './survey.service'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto'
import { Survey } from './schemas/survey.schema'
import { SurveyResponse } from './schemas/survey-response.schema'
import { SurveyQuestion } from './schemas/survey-question.schema'
import { DeviceId } from '../../common/decorators/device.decorator'

@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    createSurvey(
        @DeviceId() deviceId: string,
        @Body() dto: CreateSurveyDto
    ): Promise<Survey> {
        return this.surveyService.createSurvey(deviceId, dto)
    }

    @Get()
    getSurveys(): Promise<Survey[]> {
        return this.surveyService.getSurveys()
    }

    @Get(':surveyId')
    getSurvey(@Param('surveyId') id: string): Promise<Survey> {
        return this.surveyService.getSurveyById(id)
    }

    @Get(':surveyId/questions')
    getSurveyQuestions(
        @Param('surveyId') id: string
    ): Promise<SurveyQuestion[]> {
        return this.surveyService.getSurveyQuestions(id)
    }

    @Post(':surveyId/respond')
    submitResponse(
        @DeviceId() deviceId: string,
        @Param('surveyId') surveyId: string,
        @Body() dto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        return this.surveyService.submitSurveyResponse(surveyId, deviceId, dto)
    }

    @Get(':surveyId/responses')
    getSurveyResponses(
        @Param('surveyId') id: string
    ): Promise<SurveyResponse[]> {
        return this.surveyService.getSurveyResponses(id)
    }
}
