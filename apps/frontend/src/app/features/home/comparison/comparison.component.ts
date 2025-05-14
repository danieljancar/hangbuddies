import { Component } from '@angular/core'
import { ComparisonTableComponent } from './comparison-table/comparison-table.component'
import { ComparisonCtaComponent } from './comparison-cta/comparison-cta.component'

export const PLATFORMS = ['HangBuddies', 'Google Forms', 'Doodle'] as const
export type Platform = (typeof PLATFORMS)[number]

@Component({
    selector: 'app-comparison',
    standalone: true,
    imports: [ComparisonTableComponent, ComparisonCtaComponent],
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
