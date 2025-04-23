import { IsBoolean, IsIn, IsInt, IsOptional, IsObject } from 'class-validator'
import { StatusEnumType, StatusType } from '../types/status.types'

export class SurveyMetaDto {
    @IsOptional()
    @IsBoolean()
    isHidden?: boolean

    @IsOptional()
    @IsIn([StatusType.DRAFT, StatusType.PUBLISHED, StatusType.ARCHIVED])
    status?: StatusEnumType

    @IsOptional()
    @IsInt()
    voteCount?: number

    @IsOptional()
    @IsInt()
    viewCount?: number

    @IsOptional()
    @IsObject()
    additional?: Record<string, unknown>
}
