import {
    IsString,
    IsNotEmpty,
    IsOptional,
    ValidateNested,
    IsArray,
    IsBoolean,
    IsIn,
    IsInt,
    IsObject,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateQuestionDto } from './create-question.dto'
import { StatusType, StatusEnumType } from '../../types/status.types'

export class SurveyMetaDto {
    @IsOptional()
    @IsBoolean()
    isHidden?: boolean

    @IsOptional()
    @IsIn(StatusEnumType)
    status?: number

    @IsOptional()
    @IsInt()
    voteCount?: number

    @IsOptional()
    @IsInt()
    viewCount?: number

    @IsOptional()
    @IsObject()
    additional?: Record<string, any>
}

export class CreateSurveyDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsString()
    @IsNotEmpty()
    createdBy: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions?: CreateQuestionDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => SurveyMetaDto)
    meta?: SurveyMetaDto
}
