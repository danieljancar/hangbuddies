import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { DeviceService } from './device.service'
import { Device } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'

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
        @Body() createDeviceDto: CreateDeviceDto
    ): Promise<Device> {
        return this.deviceService.findOrCreate(
            createDeviceDto.deviceId,
            createDeviceDto
        )
    }
}
