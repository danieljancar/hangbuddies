import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { QuestionEnumType, QuestionType } from '../types/question.types'

export type QuestionDocument = Question & Document

@Schema()
export class Question {
    @Prop({ required: true })
    text: string

    @Prop({ required: true, enum: QuestionType })
    type: QuestionEnumType

    @Prop({ type: [String], default: [] })
    options: string[]

    @Prop({ default: false })
    isRequired: boolean
}

export const QuestionSchema = SchemaFactory.createForClass(Question)
