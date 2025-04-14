import { IsMongoId, IsNotEmpty, IsDefined } from 'class-validator'

export class AnswerDto {
    @IsMongoId()
    @IsNotEmpty()
    questionId: string

    @IsDefined()
    answer: string | string[]
}
