import { Component, Input } from '@angular/core'
import { BlogType } from '../../../../types/blog.type'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { APP_ROUTES } from '../../../../common/routes'
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from '@angular/material/card'
import { BlogTagComponent } from './blog-tag/blog-tag.component'

@Component({
    selector: 'app-blog-post',
    imports: [
        DatePipe,
        RouterLink,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        BlogTagComponent,
    ],
    templateUrl: './blog-post.component.html',
    standalone: true,
    styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
    @Input() post: BlogType = {} as BlogType
    protected readonly APP_ROUTES = APP_ROUTES
}
