import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { DeviceType } from '../types/device-type.types'

export type DeviceDocument = HydratedDocument<Device>

@Schema({ timestamps: true })
export class Device {
    @Prop({ required: true, unique: true, index: true })
    deviceId: string

    @Prop()
    userAgent?: string

    @Prop({ type: Number, enum: DeviceType, default: DeviceType.OTHER })
    deviceType: DeviceType

    @Prop({ default: 0 })
    totalSubmissions: number

    @Prop({ default: Date.now })
    lastActive: Date

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const DeviceSchema = SchemaFactory.createForClass(Device)

DeviceSchema.virtual('id').get(function (this: DeviceDocument) {
    return this._id.toHexString()
})

DeviceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
