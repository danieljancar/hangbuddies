import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-multiple-choice-question',
    imports: [],
    templateUrl: './multiple-choice-question.component.html',
    styleUrl: './multiple-choice-question.component.scss',
    standalone: true,
})
export class MultipleChoiceQuestionComponent {
    @Input() group!: FormGroup
}
