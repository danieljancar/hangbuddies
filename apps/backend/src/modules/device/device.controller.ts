import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceDocument } from './schemas/device.schema'
import { DeviceId } from '../../common/decorators/device.decorator'
import { DevicePartial } from './types/device-partial.types'

@Controller('devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Get(':deviceId')
    async getDevice(
        @Param('deviceId') deviceId: string
    ): Promise<DevicePartial> {
        return this.deviceService.getDevice(deviceId)
    }

    @Post()
    async createDevice(
        @DeviceId() deviceId: string,
        @Body() createDto: CreateDeviceDto
    ): Promise<DeviceDocument> {
        return this.deviceService.findOrCreate(deviceId, createDto)
    }
}
