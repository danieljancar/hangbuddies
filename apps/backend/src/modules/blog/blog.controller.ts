import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Query,
} from '@nestjs/common'
import { BlogService } from './blog.service'
import { PaginationResponse } from './types/pagination-response.type'
import { BlogDocument } from './schemas/blog.schema'
import { BlogTag } from './types/blog-tag.type'

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    async getBlogs(
        @Query('p') p = 1,
        @Query('l') l = 5,
        @Query('q') q = '',
        @Query('s') s: 'asc' | 'desc' = 'asc',
        @Query('t') t = ''
    ): Promise<PaginationResponse> {
        const page = Number(p) || 1
        const limit = Number(l) || 5
        const query = q || ''
        const sortOption: 'asc' | 'desc' = s || 'asc'
        const tags = t ? t.split(',').filter(Boolean) : []

        const blogs: BlogDocument[] = await this.blogService.getBlogs(
            page,
            limit,
            query,
            sortOption,
            tags
        )
        const totalCount: number = await this.blogService.countBlogs(
            query,
            tags
        )
        const totalPages: number = Math.ceil(totalCount / limit)

        return {
            data: blogs,
            pagination: {
                pages: {
                    current: page,
                    total: totalPages,
                },
                limit,
                total: totalCount,
            },
            query: {
                tags,
                search: query,
            },
            sortOption,
        }
    }

    @Get('latest')
    async getLatestBlogs(@Query('l') l: number): Promise<BlogDocument[]> {
        const resolvedLimit = l || 3
        return this.blogService.getLatestBlogs(resolvedLimit)
    }

    @Get('tags')
    async getTags(): Promise<BlogTag[]> {
        return await this.blogService.getAllTags()
    }

    @Get(':id')
    async getBlogById(@Param('id') id: string): Promise<BlogDocument> {
        const blog: BlogDocument | null = await this.blogService.getBlogById(id)

        if (blog) {
            return blog
        }

        throw new NotFoundException(`Blog with id ${id} not found`)
    }
}
