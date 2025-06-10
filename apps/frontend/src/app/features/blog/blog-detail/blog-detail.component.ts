import { Component, OnInit } from '@angular/core'
import { BlogService } from '../../../core/blog.service'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { BlogType } from '../../../types/blog.type'
import { APP_ROUTES } from '../../../common/routes'
import { MatIcon } from '@angular/material/icon'
import { DatePipe } from '@angular/common'
import { MatDivider } from '@angular/material/divider'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MarkdownComponent } from 'ngx-markdown'

@Component({
    selector: 'app-blog-detail',
    imports: [
        RouterLink,
        MatIcon,
        DatePipe,
        MatDivider,
        MatProgressSpinner,
        MarkdownComponent,
    ],
    templateUrl: './blog-detail.component.html',
    standalone: true,
    styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
    blog: BlogType = {} as BlogType
    isLoading: boolean = true

    constructor(
        private readonly blogService: BlogService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isLoading = true

        this.route.paramMap.subscribe((params) => {
            const blogId = params.get('id')
            if (blogId) {
                this.blogService.getBlogById(blogId).subscribe((blog) => {
                    this.blog = blog
                    this.isLoading = false
                })
            } else {
                console.error('Blog ID not found in URL')
                this.isLoading = false
            }
        })
    }

    protected readonly APP_ROUTES = APP_ROUTES
}
