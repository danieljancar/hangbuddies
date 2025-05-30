import { Component, Input } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { Platform } from '../comparison.component'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-comparison-table',
    standalone: true,
    imports: [MatIcon, NgClass],
    templateUrl: './comparison-table.component.html',
    styleUrls: ['./comparison-table.component.scss'],
})
export class ComparisonTableComponent {
    @Input() platforms: Platform[] = []
    @Input() features: { label: string; values: boolean[] }[] = []

    getIconClass(value: boolean) {
        return value ? 'check-icon' : 'close-icon'
    }
}
