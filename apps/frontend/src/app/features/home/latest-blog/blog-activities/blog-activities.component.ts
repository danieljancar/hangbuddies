import { Component } from '@angular/core'
import { BlogPostComponent } from './blog-post/blog-post.component'
import { RouterLink } from '@angular/router'
import { BlogPostType } from '../../../../types/blog-post.type'
import { MatIcon } from '@angular/material/icon'
import { APP_ROUTES } from '../../../../common/routes'
import { MatDivider } from '@angular/material/divider'

@Component({
    selector: 'app-blog-activities',
    imports: [BlogPostComponent, RouterLink, MatIcon, MatDivider],
    templateUrl: './blog-activities.component.html',
    standalone: true,
    styleUrl: './blog-activities.component.scss',
})
export class BlogActivitiesComponent {
    articles: BlogPostType[] = [
        {
            id: '1',
            title: 'Maximizing Your Event Polls: Best Practices',
            description:
                'Learn the best practices for creating event polls that engage participants and lead to successful events. Discover how to...',
            content:
                'Creating effective event polls requires clarity, timing, and user-friendly options. Use concise questions, avoid too many choices, and promote the poll early. Utilize reminder emails and analyze responses quickly to adapt your planning.',
            tags: ['Tips & Tricks'],
            author: 'Lisa Hoffmann',
            createdAt: new Date('2025-05-01T10:30:00'),
            updatedAt: new Date('2025-05-01T10:30:00'),
        },
        {
            id: '2',
            title: 'Strategies to Get More People to Participate',
            description:
                'Struggling to get responses on your event poll? Learn five easy techniques to boost participation, from personal invites to...',
            content:
                'Boosting participation involves sending personalized invitations, limiting the number of options, using clear deadlines, offering small incentives, and sharing results to create transparency. Make it easy and quick to respond.',
            tags: ['Planning & Organization'],
            author: 'Jonas Meier',
            createdAt: new Date('2025-04-25T14:00:00'),
            updatedAt: new Date('2025-04-26T09:15:00'),
        },
        {
            id: '3',
            title: 'Last-Minute Event Planning? What to do.',
            description:
                'Need to plan an event on short notice? From quick poll setup to instant confirmations, here’s how to organize a successful...',
            content:
                'For last-minute events, use pre-made templates and digital tools for quick poll creation. Communicate via instant messaging, set tight response deadlines, and confirm availability in real-time to stay agile.',
            tags: ['Planning & Organization'],
            author: 'Sandra Klein',
            createdAt: new Date('2025-04-29T08:45:00'),
            updatedAt: new Date('2025-04-30T10:10:00'),
        },
    ]
    protected readonly APP_ROUTES = APP_ROUTES
}
