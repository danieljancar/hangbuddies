import { Component } from '@angular/core'
import { BlogPostComponent } from './blog-post/blog-post.component'
import { RouterLink } from '@angular/router'
import { PostType } from '../../../../types/post.type'
import { MatIcon } from '@angular/material/icon'
import { APP_ROUTES } from '../../../../common/routes'

@Component({
    selector: 'app-blog-activities',
    imports: [BlogPostComponent, RouterLink, MatIcon],
    templateUrl: './blog-activities.component.html',
    standalone: true,
    styleUrl: './blog-activities.component.scss',
})
export class BlogActivitiesComponent {
    articles: PostType[] = [
        {
            id: 1,
            title: 'Maximizing Your Event Polls: Best Practices',
            description:
                'Learn the best practices for creating event polls that engage participants and lead to successful events. Discover how to...',
            date: new Date(),
            tags: ['Tips & Tricks'],
        },
        {
            id: 2,
            title: 'Strategies to Get More People to Participate',
            description:
                'Struggling to get responses on your event poll? Learn five easy techniques to boost participation, from personal invites to...',
            date: new Date(),
            tags: ['Planning & Organization'],
        },
        {
            id: 3,
            title: 'Last-Minute Event Planning? What to do.',
            description:
                'Need to plan an event on short notice? From quick poll setup to instant confirmations, here’s how to organize a successful...',
            date: new Date(),
            tags: ['Planning & Organization'],
        },
    ]
    protected readonly APP_ROUTES = APP_ROUTES
}
