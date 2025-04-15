import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import { DeviceType } from '../types/device-type.types'

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    deviceId: string

    @IsOptional()
    @IsString()
    userAgent?: string

    @IsOptional()
    @IsEnum(DeviceType)
    deviceType?: DeviceType
}
