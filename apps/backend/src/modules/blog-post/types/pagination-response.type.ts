import { BlogPost, BlogPostDocument } from '../schemas/blog-post.schema'

export type PaginationResponse = {
    data: BlogPost[]
    page: number
    limit: number
    query: string
    sortOption: 'asc' | 'desc'
}
