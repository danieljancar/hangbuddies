import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BlogType } from '../../../types/blog.type'
import { BlogService } from '../../../core/services/blog.service'
import { BlogPostComponent } from '../shared/blog-post/blog-post.component'
import { BlogPaginationResponseType } from '../../../types/blog-pagination-response.type'
import { MatDivider } from '@angular/material/divider'
import { BlogTagType } from '../../../types/blog-tag.type'
import { BlogTagComponent } from '../shared/blog-post/blog-tag/blog-tag.component'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'app-blog-overview',
    imports: [
        FormsModule,
        BlogPostComponent,
        MatDivider,
        BlogTagComponent,
        MatPaginator,
    ],
    templateUrl: './blog-overview.component.html',
    standalone: true,
    styleUrl: './blog-overview.component.scss',
})
export class BlogOverviewComponent implements OnInit {
    searchTerm: string = ''
    blogs: BlogType[] = []
    tags: BlogTagType[] = []
    selectedTags: string[] = []
    pagination = {
        current: 1,
        total: 1,
        limit: 5,
        itemCount: 0,
    }

    constructor(private readonly blogService: BlogService) {}

    ngOnInit(): void {
        this.blogService.getAllTags().subscribe((tags: BlogTagType[]) => {
            this.tags = tags.map((tag) => ({
                ...tag,
                selected: false,
            }))
        })

        this.blogService
            .getAllBlogs()
            .subscribe((blogs: BlogPaginationResponseType) => {
                this.blogs = blogs.data
                this.pagination.current = blogs.pagination.pages.current
                this.pagination.total = blogs.pagination.pages.total
                this.pagination.limit = blogs.pagination.limit
                this.pagination.itemCount = blogs.pagination.total
            })
    }

    onSearch(event: Event): void {
        const target = event.target as HTMLInputElement
        if (target) {
            this.searchTerm = target.value
            this.updateBlogs()
        }
    }

    onTagClicked($event: BlogTagType) {
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
        this.pagination.current = event.pageIndex + 1
        this.pagination.limit = event.pageSize
        this.updateBlogs()
    }

    updateBlogs(): void {
        this.blogService
            .getAllBlogs(
                this.pagination.current,
                this.pagination.limit,
                this.searchTerm,
                '',
                this.selectedTags.join(',')
            )
            .subscribe((blogs: BlogPaginationResponseType) => {
                this.blogs = blogs.data
                this.pagination.total = blogs.pagination.pages.total
            })
    }

    protected readonly event = event
}
