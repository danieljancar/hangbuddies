import { IsDate, IsOptional } from 'class-validator'

export class UpdateDeviceActivityDto {
    @IsOptional()
    @IsDate()
    lastActive?: Date
}
