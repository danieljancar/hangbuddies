import { Component, inject } from '@angular/core'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { QuestionType } from '../../../../types/survey.types'
import {
    MatListItem,
    MatListItemTitle,
    MatNavList,
} from '@angular/material/list'
import { MatLine } from '@angular/material/core'

@Component({
    selector: 'app-question-type-sheet',
    standalone: true,
    template: `
        <mat-nav-list>
            <a mat-list-item (click)="select('text')">
                <span matListItemTitle>Text</span>
                <span matLine>To type a free-form text response.</span>
            </a>
            <a mat-list-item (click)="select('single-choice')">
                <span matListItemTitle>Single Choice</span>
                <span matLine>To select one option from a list.</span>
            </a>
            <a mat-list-item (click)="select('multiple-choice')">
                <span matListItemTitle>Multiple Choice</span>
                <span matLine>To select multiple options from a list.</span>
            </a>
        </mat-nav-list>
    `,
    imports: [MatNavList, MatListItem, MatListItemTitle, MatLine],
})
export class QuestionTypeSheetComponent {
    private ref = inject(MatBottomSheetRef)

    select(type: QuestionType) {
        this.ref.dismiss(type)
    }
}
