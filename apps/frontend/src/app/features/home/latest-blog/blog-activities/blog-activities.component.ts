import { Component, OnInit } from '@angular/core'
import { BlogPostComponent } from '../../../blog/shared/blog-post/blog-post.component'
import { RouterLink } from '@angular/router'
import { BlogType } from '../../../../types/blog.type'
import { MatIcon } from '@angular/material/icon'
import { APP_ROUTES } from '../../../../common/routes'
import { MatDivider } from '@angular/material/divider'
import { MatAnchor } from '@angular/material/button'
import { BlogService } from '../../../../core/services/blog.service'

@Component({
    selector: 'app-blog-activities',
    imports: [BlogPostComponent, RouterLink, MatIcon, MatDivider, MatAnchor],
    templateUrl: './blog-activities.component.html',
    standalone: true,
    styleUrl: './blog-activities.component.scss',
})
export class BlogActivitiesComponent implements OnInit {
    articles: BlogType[] = []
    protected readonly APP_ROUTES = APP_ROUTES

    constructor(private readonly blogService: BlogService) {}

    ngOnInit() {
        this.blogService.getLatestBlogs().subscribe((posts: any) => {
            this.articles = posts
        })
    }
}
