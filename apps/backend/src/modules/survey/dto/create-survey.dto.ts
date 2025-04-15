import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsArray,
    ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateQuestionDto } from './create-question.dto'
import { SurveyMetaDto } from './survey-meta.dto'

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
