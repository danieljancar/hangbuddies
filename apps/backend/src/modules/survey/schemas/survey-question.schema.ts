import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { QuestionType } from '../types/question.types'

export type SurveyQuestionDocument = HydratedDocument<SurveyQuestion>

@Schema({ timestamps: false })
export class SurveyQuestion {
    _id: Types.ObjectId

    id: string

    @Prop({ required: true })
    text: string

    @Prop({ required: true, enum: QuestionType })
    type: QuestionType

    @Prop({ type: [String], default: [] })
    options?: string[]

    @Prop({ default: false })
    isRequired: boolean
}

export const SurveyQuestionSchema = SchemaFactory.createForClass(SurveyQuestion)

SurveyQuestionSchema.virtual('id').get(function (this: SurveyQuestionDocument) {
    return this._id.toHexString()
})

SurveyQuestionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
