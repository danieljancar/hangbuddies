import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Answer, AnswerSchema } from './answer.schema'

export type ResponseDocument = Response & Document

@Schema({ timestamps: true })
export class Response {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Survey' })
    surveyId: Types.ObjectId

    @Prop({ required: true })
    deviceId: string

    @Prop({ type: [AnswerSchema], default: [] })
    answers: Answer[]
}

export const ResponseSchema = SchemaFactory.createForClass(Response)
