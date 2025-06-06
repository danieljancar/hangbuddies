import { Component, OnInit } from '@angular/core'
import { BlogPostComponent } from '../../../blog/shared/blog-post/blog-post.component'
import { RouterLink } from '@angular/router'
import { BlogType } from '../../../../types/blog.type'
import { MatIcon } from '@angular/material/icon'
import { APP_ROUTES } from '../../../../common/routes'
import { MatDivider } from '@angular/material/divider'
import { MatAnchor } from '@angular/material/button'
import { BlogService } from '../../../../core/services/blog.service'
import { LoadingBlogPostComponent } from '../../../blog/shared/loading-blog-post/loading-blog-post.component'

@Component({
    selector: 'app-blog-activities',
    imports: [
        BlogPostComponent,
        RouterLink,
        MatIcon,
        MatDivider,
        MatAnchor,
        LoadingBlogPostComponent,
    ],
    templateUrl: './blog-activities.component.html',
    standalone: true,
    styleUrl: './blog-activities.component.scss',
})
export class BlogActivitiesComponent implements OnInit {
    articles: BlogType[] = []
    protected readonly APP_ROUTES = APP_ROUTES
    isLoading = true

    constructor(private readonly blogService: BlogService) {}

    ngOnInit() {
        this.isLoading = true
        this.blogService.getLatestBlogs().subscribe((posts: BlogType[]) => {
            this.articles = posts
            this.isLoading = false
        })
    }
}
