import { Component, inject } from '@angular/core'
import {
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatButton } from '@angular/material/button'
import { LocalStorageService } from '../../../../utils/local-storage.service'
import { LOCAL_STORAGE_KEYS } from '../../../../common/storage.constants'

@Component({
    selector: 'app-get-started',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatIcon,
        MatCardTitle,
        MatCardAvatar,
        MatButton,
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
                'Start by setting up a poll with event details, date options, and a short description. Customize it to fit your needs and share it right away.',
        },
        {
            icon: 'share',
            title: 'Share Effortlessly',
            description:
                'Send the poll link to friends, colleagues, or participants. No sign-up required—anyone can cast their vote immediately.',
        },
        {
            icon: 'check_circle',
            title: 'Finalize Easily',
            description:
                'Pick the best time based on the majority’s preference. Planning meetups, organizing events, or just picking a date has never been simpler.',
        },
    ]
    readonly #localStorageService = inject(LocalStorageService)

    hideSection() {
        this.#localStorageService.setWithExpiry(
            LOCAL_STORAGE_KEYS.UI_STATE.HIDE_LANDING,
            true,
            1
        )
    }
}
