import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<
            DeviceDocument & { createdAt: Date; updatedAt: Date }
        >,
        private readonly logService: LogService
    ) {}

    async findOrCreate(
        deviceId: string,
        createDto?: CreateDeviceDto
    ): Promise<DeviceDocument> {
        const update = {
            $setOnInsert: {
                deviceId,
                userAgent: createDto?.userAgent,
                deviceType: createDto?.deviceType,
            },
        }

        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }

        const device = await this.deviceModel
            .findOneAndUpdate({ deviceId }, update, options)
            .exec()

        if (!device) {
            throw new Error(
                `Failed to find or create device with id ${deviceId}`
            )
        }

        const isNew =
            device.createdAt &&
            device.updatedAt &&
            device.createdAt.getTime() === device.updatedAt.getTime()

        if (isNew) {
            await this.logService.log(
                `Device with id ${deviceId} not found, creating a new one`,
                LogCategoryType.DEVICE
            )
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

    async updateLastActive(deviceId: string): Promise<DeviceDocument> {
        const now = new Date()
        const device = await this.deviceModel
            .findOneAndUpdate(
                { deviceId },
                { $set: { lastActive: now } },
                { new: true, upsert: true }
            )
            .exec()

        if (!device) {
            throw new Error(
                `Failed to update or create device with deviceId: ${deviceId}`
            )
        }
        return device
    }

    async getDevice(deviceId: string): Promise<Partial<DeviceDocument>> {
        const device = await this.deviceModel
            .findOne({ deviceId })
            .select('deviceId totalSubmissions lastActive -_id')
            .lean()
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
