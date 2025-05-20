// create-survey.component.ts
import {
    Component,
    inject,
    ChangeDetectorRef,
    HostListener,
    OnInit,
} from '@angular/core'
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import {
    DragDropModule,
    CdkDragDrop,
    moveItemInArray,
} from '@angular/cdk/drag-drop'
import { Router } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import {
    QuestionType,
    QuestionTypeEnum,
    BackendSurvey,
    BackendQuestion,
} from '../../../types/survey.types'
import { TextQuestionComponent } from './question-forms/text-question/text-question.component'
import { QuestionTypeSheetComponent } from './question-type-sheet/question-type-sheet.component'
import {
    DialogComponent,
    DialogData,
} from '../../../shared/components/dialog/dialog.component'
import { Observable } from 'rxjs'

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
        MatDialogModule,
        MatDividerModule,
        DragDropModule,
        TextQuestionComponent,
    ],
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
    protected readonly QuestionTypeEnum = QuestionTypeEnum
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
    private sheet = inject(MatBottomSheet)
    private dialog = inject(MatDialog)
    private cdr = inject(ChangeDetectorRef)
    private router = inject(Router)

    get questions(): FormArray<QuestionFormGroup> {
        return this.form.controls.questions
    }

    ngOnInit(): void {
        // Ensure at least one question on init
        if (this.questions.length === 0) {
            this.questions.push(this.createQuestion('text'))
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnload(event: BeforeUnloadEvent): void {
        if (this.hasUnsavedChanges()) {
            event.returnValue = true
        }
    }

    addQuestion(): void {
        this.sheet
            .open(QuestionTypeSheetComponent)
            .afterDismissed()
            .pipe(takeUntilDestroyed())
            .subscribe((type: QuestionType | undefined) => {
                if (type) {
                    this.questions.push(this.createQuestion(type))
                    this.cdr.markForCheck()
                }
            })
    }

    removeQuestion(index: number): void {
        this.questions.removeAt(index)
    }

    drop(event: CdkDragDrop<QuestionFormGroup[]>): void {
        moveItemInArray(
            this.questions.controls,
            event.previousIndex,
            event.currentIndex
        )
        this.questions.controls.forEach((group, i) =>
            group.get('order')!.setValue(i)
        )
    }

    hasUnsavedChanges(): boolean {
        return this.form.dirty
    }

    cancel(): void {
        this.discard()
            .pipe(takeUntilDestroyed())
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.router.navigate(['/dashboard/overview'])
                }
            })
    }

    discard(): Observable<boolean> {
        const data: DialogData = {
            title: 'Discard Survey?',
            message: 'You have unsaved changes. Discard and leave?',
            cancelText: 'Continue Editing',
            confirmText: 'Discard',
        }
        return this.dialog.open(DialogComponent, { data }).afterClosed()
    }

    review(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched()
            return
        }
        const raw = this.questions.getRawValue()
        const payload: BackendSurvey = {
            title: this.form.controls['title'].value,
            description: this.form.controls['description'].value || undefined,
            questions: raw.map(
                (q): BackendQuestion => ({
                    text: q.label,
                    type: this.mapType(q.type),
                    options: q.options.length ? q.options : undefined,
                    isRequired: q.isRequired,
                })
            ),
        }
        this.router.navigate(['/survey-review'], { state: { survey: payload } })
    }

    private createQuestion(type: QuestionType): QuestionFormGroup {
        const idx = this.questions.length
        return this.fb.group({
            type: this.fb.control(type, { nonNullable: true }),
            label: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
            options: this.fb.array([]),
            isRequired: this.fb.control(false, { nonNullable: true }),
            order: this.fb.control(idx, { nonNullable: true }),
        }) as QuestionFormGroup
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
                throw new Error(`Unsupported type ${type}`)
        }
    }
}
