import { BlogType } from './blog.type'

export type BlogPaginationResponseType = {
    data: BlogType[]
    total: number
    pagination: {
        pages: {
            current: number
            total: number
        }
        limit: number
        total: number
    }
    limit: number
    query: {
        tags: string
        search: string
    }
}
