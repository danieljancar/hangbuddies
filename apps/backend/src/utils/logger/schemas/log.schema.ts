import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { LogCategoryType, LogLevelType } from '../types/log.types'

@Schema({ timestamps: false })
export class Log {
    @Prop({ required: true, enum: LogLevelType })
    level: string

    @Prop({ required: true })
    message: string

    @Prop({ required: true, enum: LogCategoryType })
    category: string

    @Prop({ type: Object })
    extra?: Record<string, any>

    @Prop({ type: Date, default: Date.now })
    timestamp: Date
}

export type LogDocument = Log & Document
export const LogSchema = SchemaFactory.createForClass(Log)
