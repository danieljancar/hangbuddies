import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { QuestionEnumType, QuestionType } from '../types/question.types'

export type SurveyQuestionDocument = SurveyQuestion & Document

@Schema()
export class SurveyQuestion {
    _id: string

    @Prop({ required: true })
    text: string

    @Prop({ required: true, enum: QuestionType })
    type: QuestionEnumType

    @Prop({ required: false, type: [String] })
    options?: string[]

    @Prop({ default: false })
    isRequired: boolean
}

export const SurveyQuestionSchema = SchemaFactory.createForClass(SurveyQuestion)
