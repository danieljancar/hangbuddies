import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateBlogPostDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    content: string // Markdown content

    @IsString()
    @IsNotEmpty()
    author: string

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    tags: string[]
}
