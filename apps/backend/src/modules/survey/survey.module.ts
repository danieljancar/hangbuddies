import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Survey, SurveySchema } from './schemas/survey.schema'
import {
    SurveyResponse,
    SurveyResponseSchema,
} from './schemas/survey-response.schema'
import { SurveyService } from './survey.service'
import { SurveyController } from './survey.controller'
import { DeviceModule } from '../../utils/device/device.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Survey.name, schema: SurveySchema },
            { name: SurveyResponse.name, schema: SurveyResponseSchema },
        ]),

        DeviceModule,
    ],
    providers: [SurveyService],
    controllers: [SurveyController],
    exports: [SurveyService],
})
export class SurveyModule {}
