import { Controller, Get, Query } from '@nestjs/common'
import { BlogPostService } from './blog-post.service'

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
    ) {
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

    @Get(':id')
    async getBlogPostById(@Query('id') id: string) {
        return this.blogPostService.getBlogPostById(id)
    }

    @Get('latest')
    async getLatestBlogPosts(
        @Query('limit') limit: number = 5,
        @Query('l') l: number
    ) {
        const resolvedLimit = l || limit
        console.log(resolvedLimit)
        return this.blogPostService.getLatestBlogPosts(resolvedLimit)
    }
}
