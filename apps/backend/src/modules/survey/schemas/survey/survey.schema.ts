import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Question, QuestionSchema } from './question.schema'
import { SurveyMeta, SurveyMetaSchema } from './survey-meta.schema'

export type SurveyDocument = Survey & Document

@Schema({ timestamps: true })
export class Survey {
    @Prop({ required: true })
    title: string

    @Prop()
    description?: string

    @Prop({ required: true })
    createdBy: string

    @Prop({ type: [QuestionSchema], default: [] })
    questions: Question[]

    @Prop({ type: SurveyMetaSchema, default: () => ({}) })
    meta: SurveyMeta
}

export const SurveySchema = SchemaFactory.createForClass(Survey)
