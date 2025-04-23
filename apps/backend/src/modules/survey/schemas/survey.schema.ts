import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { SurveyQuestion, SurveyQuestionSchema } from './survey-question.schema'
import { SurveyMeta, SurveyMetaSchema } from './survey-meta.schema'
import { Device } from '../../device/schemas/device.schema'

export type SurveyDocument = HydratedDocument<Survey>

@Schema({ timestamps: true })
export class Survey {
    @Prop({ required: true })
    title: string

    @Prop()
    description?: string

    @Prop({
        type: Types.ObjectId,
        ref: Device.name,
        required: true,
        index: true,
    })
    deviceId: Types.ObjectId

    @Prop({ type: [SurveyQuestionSchema], default: [] })
    questions: SurveyQuestion[]

    @Prop({ type: SurveyMetaSchema, default: () => ({}) })
    meta: SurveyMeta

    createdAt: Date
    updatedAt: Date
}

export const SurveySchema = SchemaFactory.createForClass(Survey)

SurveySchema.virtual('id').get(function (this: SurveyDocument) {
    return this._id.toHexString()
})

SurveySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
