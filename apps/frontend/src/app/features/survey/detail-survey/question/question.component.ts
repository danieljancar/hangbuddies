import { Component, Input } from '@angular/core'
import { CombinedSurveyQuestion } from '../../../../core/survey.service'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card'
import { DecimalPipe } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { MatFormField, MatInput } from '@angular/material/input'

@Component({
    selector: 'app-question',
    imports: [
        MatProgressBar,
        MatCard,
        MatCardHeader,
        MatIcon,
        DecimalPipe,
        MatCardContent,
        MatFormField,
        MatInput,
    ],
    templateUrl: './question.component.html',
    standalone: true,
    styleUrl: './question.component.scss',
})
export class QuestionComponent {
    @Input() question: CombinedSurveyQuestion = {} as CombinedSurveyQuestion

    getResponseText(question: CombinedSurveyQuestion): string {
        return question.responses
            .map((response) => response.text || '')
            .join('\n')
    }
}
