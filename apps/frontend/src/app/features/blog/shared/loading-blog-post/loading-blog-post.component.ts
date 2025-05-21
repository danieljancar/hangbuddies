import { Component, OnInit } from '@angular/core'
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from '@angular/material/card'

@Component({
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent],
    selector: 'app-loading-blog-post',
    templateUrl: './loading-blog-post.component.html',
    styleUrls: ['./loading-blog-post.component.scss'],
})
export class LoadingBlogPostComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
