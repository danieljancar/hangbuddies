import { Inject, Injectable } from '@nestjs/common'
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

    async createBlogPost(dto: CreateBlogPostDto): Promise<BlogPost> {
        const blogPost = new this.blogPostModel(dto)
        return blogPost.save()
    }

    async getBlogPosts(
        page: number,
        limit: number,
        query: string,
        sortOption: 'asc' | 'desc'
    ): Promise<BlogPost[]> {
        return this.getBlogPostWithPagination(page, limit, query, sortOption)
    }

    async getBlogPostWithPagination(
        page: number,
        limit: number,
        query: string = '',
        sortOption: 'asc' | 'desc' = 'asc'
    ): Promise<BlogPost[]> {
        // Check if query is a date
        const isDate = (dateString: string) => {
            const date = new Date(dateString)
            return !isNaN(date.getTime())
        }

        const searchQuery = query
            ? isDate(query)
                ? { createdAt: new Date(query) }
                : {
                      $or: [
                          { title: { $regex: query, $options: 'i' } },
                          { description: { $regex: query, $options: 'i' } },
                          { content: { $regex: query, $options: 'i' } },
                          { tags: { $regex: query, $options: 'i' } },
                      ],
                  }
            : {}

        return this.blogPostModel
            .find(searchQuery)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
    }
}
