import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { LogCategoryType, LogLevelType } from '../types/log.types'

export type LogDocument = HydratedDocument<Log>

@Schema({ timestamps: false })
export class Log {
    id: string

    @Prop({ required: true, enum: LogLevelType })
    level: string

    @Prop({ required: true })
    message: string

    @Prop({ required: true, enum: LogCategoryType })
    category: string

    @Prop({ type: Object })
    extra?: Record<string, unknown>

    @Prop({ type: Date, default: Date.now })
    timestamp: Date
}

export const LogSchema = SchemaFactory.createForClass(Log)

LogSchema.virtual('id').get(function (this: LogDocument) {
    return this._id.toHexString()
})

LogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
