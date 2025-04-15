import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SurveyResponse } from './schemas/survey-response.schema'
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto'
import { Survey } from './schemas/survey.schema'
import { CreateSurveyDto } from './dto/create-survey.dto'
import { SurveyService } from './survey.service'

@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    async createSurvey(
        @Body() createSurveyDto: CreateSurveyDto
    ): Promise<Survey> {
        return this.surveyService.createSurvey(createSurveyDto)
    }

    @Get()
    async getSurveys(): Promise<Survey[]> {
        return this.surveyService.getSurveys()
    }

    @Get(':id')
    async getSurvey(@Param('id') id: string): Promise<Survey> {
        return this.surveyService.getSurveyById(id)
    }

    @Post(':id/responses')
    async submitResponse(
        @Param('id') id: string,
        @Body() createSurveyResponseDto: CreateSurveyResponseDto
    ): Promise<SurveyResponse> {
        if (id !== createSurveyResponseDto.surveyId) {
            createSurveyResponseDto.surveyId = id
        }
        return this.surveyService.submitSurveyResponse(createSurveyResponseDto)
    }
}
