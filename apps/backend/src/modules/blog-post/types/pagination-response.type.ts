import { BlogPostDocument } from '../schemas/blog-post.schema'

export type PaginationResponse = {
    data: BlogPostDocument[]
    page: number
    limit: number
    query: {
        tags: string[]
        search: string
    }
    sortOption: 'asc' | 'desc'
}
