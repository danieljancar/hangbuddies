import { Injectable } from '@nestjs/common'
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema'
import { Model } from 'mongoose'
import { CreateBlogPostDto } from './dto/create-blog-post.dto'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class BlogPostService {
    constructor(
        @InjectModel(BlogPost.name)
        private blogPostModel: Model<BlogPostDocument>
    ) {}

    async createBlogPost(dto: CreateBlogPostDto): Promise<BlogPostDocument> {
        const blogPost = new this.blogPostModel(dto)
        return blogPost.save()
    }

    async getBlogPosts(
        page: number,
        limit: number,
        query: string,
        sortOption: 'asc' | 'desc'
    ): Promise<BlogPostDocument[]> {
        return this.getBlogPostWithPagination(page, limit, query, sortOption)
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
        page: number,
        limit: number,
        query: string = '',
        sortOption: 'asc' | 'desc' = 'asc'
    ): Promise<BlogPostDocument[]> {
        const isValidDate = (value: string): boolean => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        }

        const buildSearchQuery = (searchTerm: string) => {
            if (!searchTerm) return {}

            if (isValidDate(searchTerm)) {
                return { createdAt: new Date(searchTerm) }
            }

            const regex = { $regex: searchTerm, $options: 'i' }
            return {
                title: regex,
                description: regex,
                content: regex,
                tags: regex,
            }
        }

        const isDateQuery = isValidDate(query)
        const searchQuery = buildSearchQuery(query)
        const sortDirection: 1 | -1 = sortOption === 'asc' ? 1 : -1
        const skipCount = (page - 1) * limit

        let sortFields: Record<string, 1 | -1>

        if (isDateQuery) {
            sortFields = { createdAt: sortDirection }
        } else {
            sortFields = {
                title: sortDirection,
                description: sortDirection,
                content: sortDirection,
                author: sortDirection,
            }
        }

        return this.blogPostModel
            .find(searchQuery)
            .sort(sortFields)
            .skip(skipCount)
            .limit(limit)
            .exec()
    }
}
