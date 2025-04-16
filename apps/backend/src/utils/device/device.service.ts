import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DevicePartial } from './types/device-partial.types'
import { LogService } from '../logger/log.service'
import { LogCategoryType } from '../logger/types/log.types'

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<DeviceDocument>,
        private readonly logService: LogService
    ) {}

    async findOrCreate(
        deviceId: string,
        createDto?: CreateDeviceDto
    ): Promise<DeviceDocument> {
        let device = await this.deviceModel.findOne({ deviceId }).exec()
        if (!device) {
            await this.logService.log(
                `Device with id ${deviceId} not found, creating a new one`,
                LogCategoryType.DEVICE
            )
            device = new this.deviceModel({
                deviceId,
                userAgent: createDto?.userAgent,
                deviceType: createDto?.deviceType,
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
            await this.logService.warn(
                `Device with id ${deviceId} not found`,
                LogCategoryType.DEVICE
            )
            throw new NotFoundException(`Device with id ${deviceId} not found`)
        }
        return device
    }
}
