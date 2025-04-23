import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceType } from './types/device-type.types'
import { DevicePartial } from './types/device-partial.types'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'

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
        const updateOnInsert: Partial<
            Pick<Device, 'deviceId' | 'userAgent' | 'deviceType'>
        > = {
            deviceId,
            userAgent: createDto?.userAgent,
            deviceType: createDto?.deviceType ?? DeviceType.OTHER,
        }

        const device = await this.deviceModel
            .findOneAndUpdate(
                { deviceId },
                { $setOnInsert: updateOnInsert },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .exec()

        if (!device) {
            throw new InternalServerErrorException(
                `Failed to find or create device with id ${deviceId}`
            )
        }

        if (device.createdAt.getTime() === device.updatedAt.getTime()) {
            await this.logService.log(
                `Created new device with id ${deviceId}`,
                LogCategoryType.DEVICE
            )
        }

        return device
    }

    async recordSubmission(deviceId: string): Promise<DeviceDocument> {
        const now = new Date()

        const device = await this.deviceModel
            .findOneAndUpdate(
                { deviceId },
                { $set: { lastActive: now }, $inc: { totalSubmissions: 1 } },
                { new: true, upsert: true }
            )
            .exec()

        if (!device) {
            throw new InternalServerErrorException(
                `Failed to record submission for deviceId: ${deviceId}`
            )
        }

        return device
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
            throw new InternalServerErrorException(
                `Failed to update last active for deviceId: ${deviceId}`
            )
        }

        return device
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
