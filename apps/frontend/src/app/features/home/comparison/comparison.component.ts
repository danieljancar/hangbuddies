import { Component } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { NgClass, NgForOf } from '@angular/common'
import { MatCard } from '@angular/material/card'
import { MatButton } from '@angular/material/button'

@Component({
    selector: 'app-comparison',
    templateUrl: './comparison.component.html',
    imports: [MatIcon, NgClass, NgForOf, MatCard, MatButton],
    styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent {
    features = [
        {
            label: 'No account',
            options: [
                { name: 'HangBuddies', value: true },
                { name: 'Google Forms', value: false },
                { name: 'Doodle', value: false },
            ],
        },

        {
            label: 'Link sharing',
            options: [
                { name: 'HangBuddies', value: true },
                { name: 'Google Forms', value: true },
                { name: 'Doodle', value: true },
            ],
        },
        {
            label: 'No distractions',
            options: [
                { name: 'HangBuddies', value: true },
                { name: 'Google Forms', value: false },
                { name: 'Doodle', value: false },
            ],
        },
        {
            label: 'Any device',
            options: [
                { name: 'HangBuddies', value: true },
                { name: 'googleForms', value: true },
                { name: 'Doodle', value: true },
            ],
        },
        {
            label: 'Unnecessary emails',
            options: [
                { name: 'HangBuddies', value: false },
                { name: 'Google Forms', value: true },
                { name: 'Doodle', value: true },
            ],
        },
        {
            label: 'Real time',
            options: [
                { name: 'HangBuddies', value: true },
                { name: 'Google Forms', value: false },
                { name: 'Doodle', value: false },
            ],
        },
    ]

    getIconClass(value: boolean): string {
        return value ? 'check-icon' : 'close-icon'
    }

    getPlatformValue(
        options: { name: string; value: boolean }[],
        platform: string
    ): boolean {
        return (
            options.find((option) => option.name === platform)?.value ?? false
        )
    }
}
