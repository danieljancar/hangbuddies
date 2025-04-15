import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Survey, SurveySchema } from './schemas/survey.schema'
import {
    SurveyResponse,
    SurveyResponseSchema,
} from './schemas/survey-response.schema'
import { SurveyService } from './survey.service'
import { SurveyController } from './survey.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Survey.name, schema: SurveySchema },
            { name: SurveyResponse.name, schema: SurveyResponseSchema },
        ]),
    ],
    providers: [SurveyService],
    controllers: [SurveyController],
    exports: [SurveyService],
})
export class SurveyModule {}
