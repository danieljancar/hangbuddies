import { BlogDocument } from '../schemas/blog.schema'

export type PaginationResponse = {
    data: BlogDocument[]
    page: number
    limit: number
    query: {
        tags: string[]
        search: string
    }
    sortOption: 'asc' | 'desc'
}
