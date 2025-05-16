import { Component } from '@angular/core'
import {
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-get-started',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatIcon,
        MatCardTitle,
        MatCardAvatar,
    ],
    templateUrl: './get-started.component.html',
    styleUrl: './get-started.component.scss',
    standalone: true,
})
export class GetStartedComponent {
    protected readonly features = [
        {
            icon: 'add',
            title: 'Create Instantly',
            description:
                'Set up your question with date or topic choices and optional fields (e.g. notes, transport or dietary preferences), then generate a shareable link.',
        },
        {
            icon: 'share',
            title: 'Share Effortlessly',
            description:
                'Distribute the link to participants — no sign-up required — for immediate feedback and selections.',
        },
        {
            icon: 'check_circle',
            title: 'Decide Seamlessly',
            description:
                'Review responses in one view and choose the option that best fits the group’s needs.',
        },
    ]
}
