import { Component, Input } from '@angular/core'
import { BlogPostType } from '../../../../../types/blog-post.type'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { APP_ROUTES } from '../../../../../common/routes'
import {
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-blog-post',
    imports: [
        DatePipe,
        RouterLink,
        MatCard,
        MatCardAvatar,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
    ],
    templateUrl: './blog-post.component.html',
    standalone: true,
    styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
    @Input() post: BlogPostType = {} as BlogPostType
    protected readonly APP_ROUTES = APP_ROUTES
}
