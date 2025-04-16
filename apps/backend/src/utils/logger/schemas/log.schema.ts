import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {
    LogCategoryEnumType,
    LogCategoryType,
    LogLevelEnumType,
    LogLevelType,
} from '../types/log.types'

@Schema({ timestamps: false })
export class Log {
    @Prop({ required: true, enum: LogLevelType })
    level: LogLevelEnumType

    @Prop({ required: true })
    message: string

    @Prop({ enum: LogCategoryType })
    category: LogCategoryEnumType

    @Prop({ type: Object })
    extra?: Record<string, any>

    @Prop({ type: Date, default: Date.now })
    timestamp: Date
}

export type LogDocument = Log & Document
export const LogSchema = SchemaFactory.createForClass(Log)
