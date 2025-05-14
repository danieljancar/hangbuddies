import { Component } from '@angular/core'
import { MatCard } from '@angular/material/card'
import { MatButton } from '@angular/material/button'
import { ComparisonTableComponent } from './comparison-table/comparison-table.component'
import { MatIcon } from '@angular/material/icon'
import { MatDivider } from '@angular/material/divider'

export const PLATFORMS = ['HangBuddies', 'Google Forms', 'Doodle'] as const
export type Platform = (typeof PLATFORMS)[number]

@Component({
    selector: 'app-comparison',
    standalone: true,
    imports: [
        MatCard,
        MatButton,
        ComparisonTableComponent,
        MatIcon,
        MatDivider,
    ],
    templateUrl: './comparison.component.html',
    styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent {
    platforms: Platform[] = [...PLATFORMS]

    features: {
        label: string
        values: boolean[]
    }[] = [
        { label: 'No account', values: [true, false, false] },
        { label: 'Link sharing', values: [true, true, true] },
        { label: 'No distractions', values: [true, false, false] },
        { label: 'Any device', values: [true, true, true] },
        { label: 'Unnecessary emails', values: [false, true, true] },
        { label: 'Real time', values: [true, false, false] },
    ]
}
