import { Controller, Get, Param, Query } from '@nestjs/common'
import { BlogPostService } from './blog-post.service'
import { PaginationResponse } from './types/pagination-response.type'
import { BlogPostDocument } from './schemas/blog-post.schema'
import { NotFoundError } from 'rxjs'

@Controller('blog-posts')
export class BlogPostController {
    constructor(private readonly blogPostService: BlogPostService) {}

    @Get()
    async getBlogPosts(
        @Query('page') page: number = 1,
        @Query('p') p: number,
        @Query('limit') limit: number = 10,
        @Query('l') l: number,
        @Query('query') query: string = '',
        @Query('q') q: string,
        @Query('sortOption') sortOption: 'asc' | 'desc' = 'asc',
        @Query('s') s: 'asc' | 'desc'
    ): Promise<PaginationResponse> {
        const resolvedPage = p || page
        const resolvedLimit = l || limit
        const resolvedQuery = q || query
        const resolvedSortOption = s || sortOption

        return {
            data: await this.blogPostService.getBlogPosts(
                resolvedPage,
                resolvedLimit,
                resolvedQuery,
                resolvedSortOption
            ),
            page: resolvedPage,
            limit: resolvedLimit,
            query: resolvedQuery,
            sortOption: resolvedSortOption,
        }
    }

    @Get('latest')
    async getLatestBlogPosts(
        @Query('limit') limit: number = 5,
        @Query('l') l: number
    ): Promise<BlogPostDocument[]> {
        const resolvedLimit = l || limit
        return this.blogPostService.getLatestBlogPosts(resolvedLimit)
    }

    @Get(':id')
    async getBlogPostById(@Param('id') id: string): Promise<BlogPostDocument> {
        const blogpost: BlogPostDocument | null =
            await this.blogPostService.getBlogPostById(id)

        if (blogpost) {
            return blogpost
        }

        throw new NotFoundError(`Blog post with id ${id} not found`)
    }
}
