import { BlogDocument } from '../schemas/blog.schema'

export type PaginationResponse = {
    data: BlogDocument[]
    pagination: {
        pages: {
            total: number
            current: number
        }
        limit: number
        total: number
    }
    query: {
        tags: string[]
        search: string
    }
    sortOption: 'asc' | 'desc'
}
