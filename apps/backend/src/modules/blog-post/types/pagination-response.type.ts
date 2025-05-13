import { BlogPostDocument } from '../schemas/blog-post.schema'

export type PaginationResponse = {
    data: BlogPostDocument[]
    page: number
    limit: number
    query: string
    sortOption: 'asc' | 'desc'
}
