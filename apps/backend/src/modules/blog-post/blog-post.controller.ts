import {
    Controller,
    Get,
    Param,
    Query,
    NotFoundException,
} from '@nestjs/common'
import { BlogPostService } from './blog-post.service'
import { PaginationResponse } from './types/pagination-response.type'
import { BlogPostDocument } from './schemas/blog-post.schema'

@Controller('blog-posts')
export class BlogPostController {
    constructor(private readonly blogPostService: BlogPostService) {}

    @Get()
    async getBlogPosts(
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
            data: await this.blogPostService.getBlogPosts(
                resolvedPage,
                resolvedLimit,
                resolvedQuery,
                resolvedSortOption,
                resolvedTags
            ),
            page: resolvedPage,
            limit: resolvedLimit,
            query: {
                tags: resolvedTags,
                search: resolvedQuery,
            },
            sortOption: resolvedSortOption,
        }
    }

    @Get('latest')
    async getLatestBlogPosts(
        @Query('l') l: number
    ): Promise<BlogPostDocument[]> {
        const resolvedLimit = l || 3
        return this.blogPostService.getLatestBlogPosts(resolvedLimit)
    }

    @Get(':id')
    async getBlogPostById(@Param('id') id: string): Promise<BlogPostDocument> {
        const blogpost: BlogPostDocument | null =
            await this.blogPostService.getBlogPostById(id)

        if (blogpost) {
            return blogpost
        }

        throw new NotFoundException(`Blog post with id ${id} not found`)
    }
}
