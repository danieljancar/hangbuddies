import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { AnswerDto } from './answer.dto'

export class ResponseDto {
    @IsString()
    @IsNotEmpty()
    surveyId: string

    @IsString()
    @IsNotEmpty()
    deviceId: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    answers: AnswerDto[]
}
