import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { DeviceService } from './device.service'
import { Device } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceId } from '../../common/decorators/device.decorator'

@Controller('devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Get(':deviceId')
    async getDevice(
        @Param('deviceId') deviceId: string
    ): Promise<Partial<Device>> {
        return this.deviceService.getDevice(deviceId)
    }

    @Post()
    async createDevice(
        @DeviceId() deviceId: string,
        @Body() createDeviceDto: CreateDeviceDto
    ): Promise<Device> {
        return this.deviceService.findOrCreate(deviceId, createDeviceDto)
    }
}
