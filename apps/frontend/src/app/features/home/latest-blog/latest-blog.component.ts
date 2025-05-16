import { Component } from '@angular/core'
import { BlogActivitiesComponent } from './blog-activities/blog-activities.component'

@Component({
    selector: 'app-latest-blog',
    imports: [BlogActivitiesComponent],
    templateUrl: './latest-blog.component.html',
    standalone: true,
    styleUrl: './latest-blog.component.scss',
})
export class LatestBlogComponent {}
