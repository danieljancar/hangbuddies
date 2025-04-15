import { IsOptional, IsString } from 'class-validator'

export class UpdateDeviceDto {
    @IsOptional()
    @IsString()
    lastActive?: string
}
