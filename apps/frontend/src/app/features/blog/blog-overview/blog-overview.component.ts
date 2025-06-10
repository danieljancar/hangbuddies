import { Component, OnInit, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BlogType } from '../../../types/blog.type'
import { BlogService } from '../../../core/blog.service'
import { BlogPostComponent } from '../shared/blog-post/blog-post.component'
import { BlogPaginationResponseType } from '../../../types/blog-pagination-response.type'
import { MatDivider } from '@angular/material/divider'
import { BlogTagType } from '../../../types/blog-tag.type'
import { BlogTagComponent } from '../shared/blog-post/blog-tag/blog-tag.component'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { LoadingBlogPostComponent } from '../shared/loading-blog-post/loading-blog-post.component'

@Component({
    selector: 'app-blog-overview',
    imports: [
        FormsModule,
        BlogPostComponent,
        MatDivider,
        BlogTagComponent,
        MatPaginator,
        LoadingBlogPostComponent,
    ],
    templateUrl: './blog-overview.component.html',
    standalone: true,
    styleUrl: './blog-overview.component.scss',
    providers: [],
})
export class BlogOverviewComponent implements OnInit {
    searchTerm: string = ''
    blogs: BlogType[] = []
    tags: BlogTagType[] = []
    selectedTags: string[] = []
    pagination = signal({
        current: 1,
        total: 1,
        limit: 5,
        itemCount: 0,
    })
    isLoading: boolean = false

    constructor(private readonly blogService: BlogService) {}

    ngOnInit(): void {
        this.updateBlogs()

        this.blogService.getAllTags().subscribe((tags: BlogTagType[]) => {
            const correctedTags = tags.map((tag) => ({
                ...tag,
                selected: false,
            }))

            this.tags = correctedTags

            const urlParams = new URLSearchParams(window.location.search)
            const urlTagParam = urlParams.get('t')
            if (urlTagParam) {
                correctedTags.forEach((tag) => {
                    if (urlTagParam.split(',').includes(tag.name)) {
                        this.onTagClicked(tag)
                    }
                })
            }
        })
    }

    onSearch(event: Event): void {
        const target = event.target as HTMLInputElement
        if (target) {
            this.searchTerm = target.value
            this.updateBlogs()
        }
    }

    onTagClicked($event: BlogTagType): void {
        const index = this.tags.findIndex((tag) => tag.id === $event.id)
        if (index !== -1) {
            this.tags[index].selected = !this.tags[index].selected
        }

        this.selectedTags = this.tags
            .filter((tag) => tag.selected)
            .map((tag) => tag.name)
        this.updateBlogs()
    }

    onPageChange(event: PageEvent): void {
        this.pagination.set({
            current: event.pageIndex + 1,
            limit: event.pageSize,
            total: this.pagination().total,
            itemCount: this.pagination().itemCount,
        })
        this.updateBlogs()
    }

    updateBlogs(): void {
        const timeout = setTimeout(() => {
            this.isLoading = true
        }, 2000)

        this.blogService
            .getAllBlogs(
                this.pagination().current,
                this.pagination().limit,
                this.searchTerm,
                '',
                this.selectedTags.join(',')
            )
            .subscribe((blogs: BlogPaginationResponseType) => {
                this.blogs = blogs.data
                this.pagination.set({
                    total: blogs.pagination.pages.total,
                    current: blogs.pagination.pages.current,
                    limit: blogs.pagination.limit,
                    itemCount: blogs.pagination.total,
                })
                this.isLoading = false
                clearTimeout(timeout)
            })
    }
}
