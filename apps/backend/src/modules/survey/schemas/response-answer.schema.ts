import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'

@Schema({ _id: false })
export class ResponseAnswer {
    @Prop({ required: true, type: Types.ObjectId })
    questionId: Types.ObjectId

    @Prop({ required: true, type: MongooseSchema.Types.Mixed })
    answer: string | string[]
}

export const ResponseAnswerSchema = SchemaFactory.createForClass(ResponseAnswer)
