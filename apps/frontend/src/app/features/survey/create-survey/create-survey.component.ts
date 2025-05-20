import { ChangeDetectorRef, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
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
    QuestionTypeEnum,
} from '../../../types/survey.types'
import { TextQuestionComponent } from './question-forms/text-question/text-question.component'
import { QuestionTypeSheetComponent } from './question-type-sheet/question-type-sheet.component'
import { MatDivider } from '@angular/material/divider'

type QuestionFormGroup = FormGroup<{
    type: FormControl<QuestionType>
    label: FormControl<string>
    options: FormArray<FormControl<string>>
    isRequired: FormControl<boolean>
    order: FormControl<number>
}>

@Component({
    selector: 'app-create-survey',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        DragDropModule,
        TextQuestionComponent,
        MatDivider,
    ],
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent {
    private fb = inject(FormBuilder)
    form = this.fb.group({
        title: this.fb.control('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: this.fb.control('', { nonNullable: true }),
        questions: this.fb.array<QuestionFormGroup>([], {
            validators: [Validators.minLength(1)],
        }),
    }) as FormGroup & { controls: { questions: FormArray<QuestionFormGroup> } }
    private cdr = inject(ChangeDetectorRef)
    private sheet = inject(MatBottomSheet)
    private router = inject(Router)

    constructor() {
        this.questions.push(
            this.fb.group({
                type: this.fb.control('text', { nonNullable: true }),
                label: this.fb.control('', {
                    nonNullable: true,
                    validators: [Validators.required],
                }),
                options: this.fb.array([]),
                isRequired: this.fb.control(false, {
                    nonNullable: true,
                }),
                order: this.fb.control(0, { nonNullable: true }),
            }) as QuestionFormGroup
        )
    }

    get questions(): FormArray<QuestionFormGroup> {
        return this.form.controls.questions
    }

    addQuestion(): void {
        this.sheet
            .open(QuestionTypeSheetComponent)
            .afterDismissed()
            .subscribe((type: QuestionType | undefined) => {
                if (!type) return
                const idx = this.questions.length
                this.questions.push(
                    this.fb.group({
                        type: this.fb.control(type, { nonNullable: true }),
                        label: this.fb.control('', {
                            nonNullable: true,
                            validators: [Validators.required],
                        }),
                        options: this.fb.array([]),
                        isRequired: this.fb.control(false, {
                            nonNullable: true,
                        }),
                        order: this.fb.control(idx, { nonNullable: true }),
                    }) as QuestionFormGroup
                )
                this.cdr.detectChanges()
            })
    }

    removeQuestion(i: number): void {
        this.questions.removeAt(i)
    }

    drop(event: CdkDragDrop<QuestionFormGroup[]>): void {
        moveItemInArray(
            this.questions.controls,
            event.previousIndex,
            event.currentIndex
        )
        this.questions.controls.forEach((q, i) => q.get('order')!.setValue(i))
    }

    review(): void {
        if (this.form.invalid) {
            return
        }

        const raw = this.questions.getRawValue()
        const payload: BackendSurvey = {
            title: this.form.controls['title'].value,
            description: this.form.controls['description'].value || undefined,
            questions: raw.map((q) => ({
                text: q.label,
                type: this.mapType(q.type),
                options: q.options.length > 0 ? q.options : undefined,
                isRequired: q.isRequired,
            })),
        }

        this.router.navigate(['/survey-review'], { state: { survey: payload } })
    }

    private mapType(type: QuestionType): QuestionTypeEnum {
        switch (type) {
            case 'text':
                return QuestionTypeEnum.Text
            case 'single-choice':
                return QuestionTypeEnum.SingleChoice
            case 'multiple-choice':
                return QuestionTypeEnum.MultipleChoice
            default:
                throw new Error(`Unsupported question type: ${type}`)
        }
    }
}
