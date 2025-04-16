import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import { DeviceType } from '../types/device-type.types'

export class CreateDeviceDto {
    @IsOptional()
    @IsString()
    userAgent?: string

    @IsOptional()
    @IsEnum(DeviceType)
    deviceType?: DeviceType
}
