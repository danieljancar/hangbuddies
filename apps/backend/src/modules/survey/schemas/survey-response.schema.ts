import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ResponseAnswer, ResponseAnswerSchema } from './response-answer.schema'

export type SurveyResponseDocument = SurveyResponse & Document

@Schema({ timestamps: true })
export class SurveyResponse {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Survey' })
    surveyId: Types.ObjectId

    @Prop({ required: true, type: Types.ObjectId, ref: 'Device' })
    device: Types.ObjectId

    @Prop({ type: [ResponseAnswerSchema], default: [] })
    answers: ResponseAnswer[]
}

export const SurveyResponseSchema = SchemaFactory.createForClass(SurveyResponse)
