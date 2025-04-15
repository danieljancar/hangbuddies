import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({ _id: false })
export class Answer {
    @Prop({ required: true, type: Types.ObjectId })
    questionId: Types.ObjectId

    @Prop({ required: true })
    answer: string | string[]
}

export const AnswerSchema = SchemaFactory.createForClass(Answer)
