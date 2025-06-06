import { Injectable } from '@nestjs/common'
import { Blog, BlogDocument } from './schemas/blog.schema'
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateBlogDto } from './dto/create-blog.dto'
import { BlogTag } from './types/blog-tag.type'

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name)
        private blogModel: Model<BlogDocument>
    ) {}

    async create(blog: CreateBlogDto): Promise<BlogDocument> {
        const newBlog = new this.blogModel(blog)
        return newBlog.save()
    }

    async getBlogs(
        page: number,
        limit: number,
        query: string,
        sortOption: 'asc' | 'desc',
        tags: string[]
    ): Promise<BlogDocument[]> {
        return this.getBlogsWithPagination(page, limit, query, sortOption, tags)
    }

    async getBlogById(id: string): Promise<BlogDocument | null> {
        return this.blogModel.findById(id).exec()
    }

    async getLatestBlogs(limit: number): Promise<BlogDocument[]> {
        return this.blogModel.find().sort({ createdAt: -1 }).limit(limit).exec()
    }

    async getAllTags(): Promise<BlogTag[]> {
        const blogs = await this.blogModel.find().exec()
        const allTags = blogs.map((blog) => blog.tags).flat()

        const tagCounts = allTags.reduce(
            (acc: Record<string, number>, tag: string) => {
                acc[tag] = (acc[tag] || 0) + 1
                return acc
            },
            {}
        )

        const mappedTags: BlogTag[] = Object.entries(tagCounts).map(
            ([tag, count], index) => ({
                id: index,
                name: tag,
                count: count,
            })
        )

        mappedTags.sort((a, b) => b.count - a.count)

        return mappedTags
    }

    async getTotalPages(limit: number = 5): Promise<number> {
        const totalBlogs = await this.blogModel.countDocuments().exec()
        return Math.ceil(totalBlogs / limit)
    }

    async countBlogs(query: string = '', tags: string[] = []): Promise<number> {
        const searchQuery = this.buildSearchQuery(query, tags)
        return this.blogModel.countDocuments(searchQuery).exec()
    }

    async getBlogsWithPagination(
        page: number = 1,
        limit: number = 5,
        query: string = '',
        sortOption: 'asc' | 'desc' = 'asc',
        tags: string[] = []
    ): Promise<BlogDocument[]> {
        const isDateQuery = this.isValidDate(query)
        const searchQuery = this.buildSearchQuery(query, tags)
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

        return this.blogModel
            .find(searchQuery)
            .sort(sortFields)
            .skip(skipCount)
            .limit(limit)
            .exec()
    }

    private isValidDate(value: string): boolean {
        const date = new Date(value)
        return !isNaN(date.getTime())
    }

    private buildSearchQuery(
        query: string,
        tags: string[]
    ): FilterQuery<BlogDocument> {
        const searchQuery: FilterQuery<BlogDocument> = {}

        if (this.isValidDate(query)) {
            searchQuery.createdAt = new Date(query)
            return searchQuery
        }

        if (tags.length > 0) {
            searchQuery.tags = { $in: tags }
        }

        if (query) {
            const regex = { $regex: query, $options: 'i' }
            searchQuery.$or = [
                { title: regex },
                { description: regex },
                { content: regex },
            ]
        }

        return searchQuery
    }
}
