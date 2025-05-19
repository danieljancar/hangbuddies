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
        @Query('p') p: number,
        @Query('l') l: number,
        @Query('q') q: string,
        @Query('s') s: 'asc' | 'desc',
        @Query('t') t: string = ''
    ): Promise<PaginationResponse> {
        const resolvedPage: number = p || 1
        const resolvedLimit: number = l || 5
        const resolvedQuery: string = q || ''
        const resolvedSortOption: 'asc' | 'desc' = s || 'asc'
        const resolvedTags: string[] = t.split(',')

        return {
            data: await this.blogService.getBlogs(
                resolvedPage,
                resolvedLimit,
                resolvedQuery,
                resolvedSortOption,
                resolvedTags
            ),
            pagination: {
                pages: {
                    current: resolvedPage,
                    total: await this.blogService.getTotalPages(resolvedLimit),
                },
                limit: resolvedLimit,
                total: (
                    await this.blogService.getBlogs(
                        resolvedPage,
                        resolvedLimit,
                        resolvedQuery,
                        resolvedSortOption,
                        resolvedTags
                    )
                ).length,
            },
            query: {
                tags: resolvedTags,
                search: resolvedQuery,
            },
            sortOption: resolvedSortOption,
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
