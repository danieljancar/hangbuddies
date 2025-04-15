import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAnswerDto } from './create-answer.dto'

export class CreateSurveyResponseDto {
    @IsString()
    @IsNotEmpty()
    surveyId: string

    @IsString()
    @IsNotEmpty()
    deviceId: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    answers: CreateAnswerDto[]
}
