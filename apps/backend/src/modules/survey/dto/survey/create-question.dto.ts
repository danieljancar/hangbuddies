import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsArray,
} from 'class-validator'
import { QuestionType } from '../../types/question.types'

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsEnum(QuestionType)
    type: (typeof QuestionType)[keyof typeof QuestionType]

    @IsOptional()
    @IsArray()
    options?: string[]

    @IsOptional()
    isRequired?: boolean
}
