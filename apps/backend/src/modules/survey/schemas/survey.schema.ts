import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { SurveyMeta, SurveyMetaSchema } from './survey-meta.schema'
import { SurveyQuestion, SurveyQuestionSchema } from './survey-question.schema'

export type SurveyDocument = Survey & Document

@Schema({ timestamps: true })
export class Survey {
    @Prop({ required: true })
    title: string

    @Prop()
    description?: string

    @Prop({ required: true })
    createdBy: string

    @Prop({ type: [SurveyQuestionSchema], default: [] })
    questions: SurveyQuestion[]

    @Prop({ type: SurveyMetaSchema, default: () => ({}) })
    meta: SurveyMeta
}

export const SurveySchema = SchemaFactory.createForClass(Survey)
