import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Survey, SurveySchema } from './schemas/survey.schema'
import {
    SurveyResponse,
    SurveyResponseSchema,
} from './schemas/survey-response.schema'
import { SurveyService } from './survey.service'
import { SurveyController } from './survey.controller'
import { DeviceModule } from '../device/device.module'
import { LogModule } from '../../utils/logger/log.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Survey.name, schema: SurveySchema },
            { name: SurveyResponse.name, schema: SurveyResponseSchema },
        ]),

        DeviceModule,
        LogModule,
    ],
    providers: [SurveyService],
    controllers: [SurveyController],
    exports: [SurveyService],
})
export class SurveyModule {}
