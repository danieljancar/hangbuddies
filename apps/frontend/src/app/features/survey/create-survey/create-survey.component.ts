import { Component, inject } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {
    MatBottomSheetModule,
    MatBottomSheet,
} from '@angular/material/bottom-sheet'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {
    DragDropModule,
    CdkDragDrop,
    moveItemInArray,
} from '@angular/cdk/drag-drop'
import { Router } from '@angular/router'
import {
    QuestionType,
    BackendSurvey,
    BackendQuestion,
} from '../../../types/survey.types'
import { QuestionTypeSheetComponent } from './question-type-sheet/question-type-sheet.component'

type QuestionFormGroup = FormGroup<{
    type: FormControl<QuestionType>
    label: FormControl<string>
    options: FormArray<FormControl<string>>
    isRequired: FormControl<boolean>
    order: FormControl<number>
}>

type SurveyFormGroup = FormGroup<{
    title: FormControl<string>
    description: FormControl<string>
    questions: FormArray<QuestionFormGroup>
}>

@Component({
    selector: 'app-create-survey',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        DragDropModule,
    ],
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent {
    private fb = inject(FormBuilder)
    form: SurveyFormGroup = this.fb.group({
        title: this.fb.control('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: this.fb.control('', { nonNullable: true }),
        questions: this.fb.array<QuestionFormGroup>([]),
    }) as SurveyFormGroup
    private sheet = inject(MatBottomSheet)
    private router = inject(Router)

    get questions(): FormArray<QuestionFormGroup> {
        return this.form.controls.questions
    }

    addQuestion(): void {
        this.sheet
            .open(QuestionTypeSheetComponent)
            .afterDismissed()
            .subscribe((type: QuestionType | undefined) => {
                if (!type) return
                this.questions.push(this.createQuestionGroup(type))
            })
    }

    removeQuestion(index: number): void {
        this.questions.removeAt(index)
    }

    drop(event: CdkDragDrop<QuestionFormGroup[]>): void {
        console.log(event)
        console.log(event.previousIndex, event.currentIndex)
        moveItemInArray(
            this.questions.controls,
            event.previousIndex,
            event.currentIndex
        )
        this.questions.controls.forEach((q, i) => q.get('order')!.setValue(i))
    }

    review(): void {
        if (this.form.invalid) return

        const title = this.form.controls.title.value
        const description = this.form.controls.description.value
        const rawQs = this.questions.getRawValue()

        const payload: BackendSurvey = {
            title,
            description: description || undefined,
            questions: rawQs.map((q) => this.toBackendQuestion(q)),
        }

        this.router.navigate(['/survey-review'], { state: { survey: payload } })
    }

    private createQuestionGroup(type: QuestionType): QuestionFormGroup {
        const idx = this.questions.length
        const options =
            type === 'text'
                ? []
                : ['', ''].map(() =>
                      this.fb.control('', {
                          nonNullable: true,
                          validators: [Validators.required],
                      })
                  )

        return this.fb.group({
            type: this.fb.control(type, { nonNullable: true }),
            label: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
            options: this.fb.array(options),
            isRequired: this.fb.control(false, { nonNullable: true }),
            order: this.fb.control(idx, { nonNullable: true }),
        }) as QuestionFormGroup
    }

    private toBackendQuestion(q: {
        label: string
        type: QuestionType
        options: string[]
        isRequired: boolean
    }): BackendQuestion {
        return {
            text: q.label,
            type: this.mapType(q.type),
            options: q.type === 'text' ? undefined : q.options,
            isRequired: q.isRequired,
        }
    }

    private mapType(type: QuestionType): 1 | 2 | 3 {
        switch (type) {
            case 'text':
                return 1
            case 'single-choice':
                return 2
            case 'multiple-choice':
                return 3
        }
    }
}
