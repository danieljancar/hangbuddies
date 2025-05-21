import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BlogPaginationResponseType } from '../../types/blog-pagination-response.type'
import { BlogType } from '../../types/blog.type'
import { BlogTagType } from '../../types/blog-tag.type'

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    private readonly API_BASE_URL = 'http://localhost:3000'

    constructor(private readonly http: HttpClient) {}

    getAllBlogs(
        page: number = 1,
        limit: number = 5,
        search: string = '',
        sort: string = '',
        tags: string = ''
    ): Observable<BlogPaginationResponseType> {
        return this.http.get<BlogPaginationResponseType>(
            `${this.API_BASE_URL}/blog?q=${search}&p=${page}&l=${limit}&s=${sort}&t=${tags}`
        )
    }

    getLatestBlogs(limit: number = 3): Observable<BlogType[]> {
        return this.http.get<BlogType[]>(
            `${this.API_BASE_URL}/blog/latest?l=${limit}`
        )
    }

    getBlogById(id: string): Observable<BlogType> {
        return this.http.get<BlogType>(`${this.API_BASE_URL}/blog/${id}`)
    }

    getAllTags(): Observable<BlogTagType[]> {
        return this.http.get<BlogTagType[]>(`${this.API_BASE_URL}/blog/tags`)
    }
}
