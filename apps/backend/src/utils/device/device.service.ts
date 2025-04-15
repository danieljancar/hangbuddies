import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DevicePartial } from './types/device-partial.types'

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<DeviceDocument>
    ) {}

    async findOrCreate(
        deviceId: string,
        createDto?: CreateDeviceDto
    ): Promise<DeviceDocument> {
        let device = await this.deviceModel.findOne({ deviceId }).exec()
        if (!device) {
            device = new this.deviceModel({
                deviceId,
                userAgent: createDto?.userAgent,
                deviceType: createDto?.deviceType,
                totalSubmissions: 0,
                lastActive: new Date(),
            })
            await device.save()
        }
        return device
    }

    async recordSubmission(deviceId: string): Promise<DeviceDocument> {
        const now = new Date()
        return this.deviceModel
            .findOneAndUpdate(
                { deviceId },
                {
                    $set: { lastActive: now },
                    $inc: { totalSubmissions: 1 },
                },
                { new: true, upsert: true }
            )
            .exec()
    }

    async getDevice(deviceId: string): Promise<DevicePartial> {
        const device = await this.deviceModel
            .findOne({ deviceId })
            .select('deviceId totalSubmissions lastActive -_id')
            .lean<DevicePartial>()
            .exec()
        if (!device) {
            throw new NotFoundException(`Device with id ${deviceId} not found`)
        }
        return device
    }
}
