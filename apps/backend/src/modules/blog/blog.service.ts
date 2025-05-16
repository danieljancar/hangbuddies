import { Injectable } from '@nestjs/common'
import { Blog, BlogDocument } from './schemas/blog.schema'
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateBlogDto } from './dto/create-blog.dto'

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

    async getBlogsWithPagination(
        page: number = 1,
        limit: number = 5,
        query: string = '',
        sortOption: 'asc' | 'desc' = 'asc',
        tags: string[] = []
    ): Promise<BlogDocument[]> {
        const isValidDate = (value: string): boolean => {
            const date = new Date(value)
            return !isNaN(date.getTime())
        }

        const buildSearchQuery = (
            searchTerm: string
        ): FilterQuery<BlogDocument> => {
            const query: FilterQuery<BlogDocument> = {}

            if (isValidDate(searchTerm)) {
                query.createdAt = new Date(searchTerm)
                return query
            }

            if (tags.length > 0 && tags[0] !== '') {
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

        return this.blogModel
            .find(searchQuery)
            .sort(sortFields)
            .skip(skipCount)
            .limit(limit)
            .exec()
    }
}
