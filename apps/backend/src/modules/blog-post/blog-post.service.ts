import { Injectable } from '@nestjs/common'
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema'
import { Model } from 'mongoose'
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

        const buildSearchQuery = (searchTerm: string) => {
            const query: any = {}

            // Wenn es ein valides Datum ist → direkt auf createdAt filtern
            if (isValidDate(searchTerm)) {
                query.createdAt = new Date(searchTerm)
                return query
            }

            // Tags-Filter, falls vorhanden
            if (tags.length > 0) {
                query.tags = { $in: tags }
            }

            // Textsuche mit $or über mehrere Felder
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

        console.log(JSON.stringify(searchQuery))

        return this.blogPostModel
            .find(searchQuery)
            .sort(sortFields)
            .skip(skipCount)
            .limit(limit)
            .exec()
    }
}
