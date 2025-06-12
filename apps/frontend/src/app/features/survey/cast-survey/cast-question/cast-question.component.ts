import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
    BackendSurveyQuestion,
    CastVoteAnswer,
} from '../../../../core/survey.service'
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatFormField, MatInput } from '@angular/material/input'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-cast-question',
    imports: [
        MatCard,
        MatCardHeader,
        MatIcon,
        MatCardContent,
        MatFormField,
        MatInput,
        MatCheckbox,
        MatRadioGroup,
        MatRadioButton,
        FormsModule,
    ],
    templateUrl: './cast-question.component.html',
    standalone: true,
    styleUrl: './cast-question.component.scss',
})
export class CastQuestionComponent {
    @Input() question: BackendSurveyQuestion = {} as BackendSurveyQuestion
    @Output() answer = new EventEmitter<CastVoteAnswer>()

    answerValue: string | string[] = []

    onTextChange(value: string) {
        this.answerValue = value
        this.emitAnswer()
    }

    onRadioSelect(value: string) {
        this.answerValue = value
        this.emitAnswer()
    }

    onCheckboxToggle(optionText: string) {
        const current = this.answerValue as string[]
        const index = current.indexOf(optionText)

        if (index === -1) {
            current.push(optionText)
        } else {
            current.splice(index, 1)
        }

        this.emitAnswer()
    }

    private emitAnswer() {
        this.answer.emit({
            questionId: this.question.id,
            answer: this.answerValue,
        })
    }

    isChecked(optionText: string): boolean {
        return (this.answerValue as string[]).includes(optionText)
    }
}
