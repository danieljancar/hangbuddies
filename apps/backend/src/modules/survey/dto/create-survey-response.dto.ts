import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAnswerDto } from './create-answer.dto'

export class CreateSurveyResponseDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    answers: CreateAnswerDto[]
}
