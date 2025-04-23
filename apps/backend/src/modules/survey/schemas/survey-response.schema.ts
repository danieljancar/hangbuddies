import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { ResponseAnswer, ResponseAnswerSchema } from './response-answer.schema'
import { Survey } from './survey.schema'
import { Device } from '../../device/schemas/device.schema'

export type SurveyResponseDocument = HydratedDocument<SurveyResponse>

@Schema({ timestamps: true })
export class SurveyResponse {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Survey.name,
        index: true,
    })
    surveyId: Types.ObjectId

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Device.name,
        index: true,
    })
    deviceId: Types.ObjectId

    @Prop({ required: true, type: [ResponseAnswerSchema] })
    answers: ResponseAnswer[]

    createdAt: Date
    updatedAt: Date
}

export const SurveyResponseSchema = SchemaFactory.createForClass(SurveyResponse)

SurveyResponseSchema.virtual('id').get(function (this: SurveyResponseDocument) {
    return this._id.toHexString()
})

SurveyResponseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
