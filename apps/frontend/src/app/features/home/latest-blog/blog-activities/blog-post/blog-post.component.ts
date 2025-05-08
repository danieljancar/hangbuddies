import { Component, Input } from '@angular/core'
import { PostType } from '../../../../../types/post.type'
import { DatePipe } from '@angular/common'

@Component({
    selector: 'app-blog-post',
    imports: [DatePipe],
    templateUrl: './blog-post.component.html',
    standalone: true,
    styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
    @Input() post: PostType = {} as PostType
}
