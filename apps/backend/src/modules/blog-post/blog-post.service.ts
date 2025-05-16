import { Injectable } from '@nestjs/common'
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema'
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateBlogPostDto } from './dto/create-blog-post.dto'

@Injectable()
export class BlogPostService {
    constructor(
        @InjectModel(BlogPost.name)
        private blogPostModel: Model<BlogPostDocument>
    ) {}

    async create(blogPost: CreateBlogPostDto): Promise<BlogPostDocument> {
        const newBlogPost = new this.blogPostModel(blogPost)
        return newBlogPost.save()
    }

    async getBlogPosts(
        page: number,
        limit: number,
        query: string,
        sortOption: 'asc' | 'desc',
        tags: string[]
    ): Promise<BlogPostDocument[]> {
        return this.getBlogPostWithPagination(
            page,
            limit,
            query,
            sortOption,
            tags
        )
    }

    async getBlogPostById(id: string): Promise<BlogPostDocument | null> {
        return this.blogPostModel.findById(id).exec()
    }

    async getLatestBlogPosts(limit: number): Promise<BlogPostDocument[]> {
        return this.blogPostModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec()
    }

    async getBlogPostWithPagination(
        page: number = 1,
        limit: number = 5,
        query: string = '',
        sortOption: 'asc' | 'desc' = 'asc',
        tags: string[] = []
    ): Promise<BlogPostDocument[]> {
        const isValidDate = (value: string): boolean => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        }

        const buildSearchQuery = (
            searchTerm: string
        ): FilterQuery<BlogPostDocument> => {
            const query: FilterQuery<BlogPostDocument> = {}

            if (isValidDate(searchTerm)) {
                query.createdAt = new Date(searchTerm)
                return query
            }

            if (tags.length > 0) {
                query.tags = { $in: tags }
            }

            if (searchTerm) {
                const regex = { $regex: searchTerm, $options: 'i' }
                query.$or = [
                    { title: regex },
                    { description: regex },
                    { content: regex },
                ]
            }

            return query
        }

        const isDateQuery = isValidDate(query)
        const searchQuery = buildSearchQuery(query)
        const sortDirection: 1 | -1 = sortOption === 'asc' ? 1 : -1
        const skipCount = (page - 1) * limit

        const sortFields: Record<string, 1 | -1> = {}

        if (isDateQuery) {
            sortFields.createdAt = sortDirection
        } else {
            sortFields.title = sortDirection
            sortFields.description = sortDirection
            sortFields.content = sortDirection
            sortFields.author = sortDirection
        }

        console.log(JSON.stringify(searchQuery))

        return this.blogPostModel
            .find(searchQuery)
            .sort(sortFields)
            .skip(skipCount)
            .limit(limit)
            .exec()
    }
}
