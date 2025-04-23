import { IsMongoId, IsNotEmpty, IsDefined } from 'class-validator'

export class CreateAnswerDto {
    @IsMongoId()
    @IsNotEmpty()
    questionId: string

    @IsDefined()
    answer: string | string[]
}
