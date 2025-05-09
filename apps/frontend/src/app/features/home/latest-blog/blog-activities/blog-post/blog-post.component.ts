import { Component, Input } from '@angular/core'
import { PostType } from '../../../../../types/post.type'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { APP_ROUTES } from '../../../../../common/routes'

@Component({
    selector: 'app-blog-post',
    imports: [DatePipe, RouterLink],
    templateUrl: './blog-post.component.html',
    standalone: true,
    styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
    @Input() post: PostType = {} as PostType
    protected readonly APP_ROUTES = APP_ROUTES
}
