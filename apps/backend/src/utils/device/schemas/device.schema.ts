import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { DeviceType } from '../types/device-type.types'

export type DeviceDocument = Device & Document

@Schema({ timestamps: true })
export class Device {
    @Prop({ required: true, unique: true, index: true })
    deviceId: string

    @Prop()
    userAgent?: string

    @Prop({ enum: DeviceType, default: DeviceType.OTHER })
    deviceType: DeviceType

    @Prop({ default: 0 })
    totalSubmissions: number

    @Prop({ default: Date.now })
    lastActive: Date
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
