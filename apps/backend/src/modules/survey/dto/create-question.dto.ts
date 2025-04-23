import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsArray,
    IsBoolean,
} from 'class-validator'
import { QuestionEnumType, QuestionType } from '../types/question.types'

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsEnum(QuestionType)
    type: QuestionEnumType

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    options?: string[]

    @IsOptional()
    @IsBoolean()
    isRequired?: boolean
}
