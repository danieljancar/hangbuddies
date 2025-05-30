import {
    Component,
    HostListener,
    inject,
    OnInit,
    signal,
    WritableSignal,
} from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {
    MatBottomSheet,
    MatBottomSheetModule,
} from '@angular/material/bottom-sheet'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { Router } from '@angular/router'

import {
    BackendSurvey,
    QuestionType,
    QuestionTypeEnum,
} from '../../../types/survey.types'
import { QuestionTypeSheetComponent } from './question-type-sheet/question-type-sheet.component'
import { TextQuestionComponent } from './question-forms/text-question/text-question.component'

@Component({
    selector: 'app-create-survey',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatBottomSheetModule,
        MatDialogModule,
        DragDropModule,
        TextQuestionComponent,
    ],
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
    readonly hasQuestions: WritableSignal<boolean> = signal(false)
    readonly hasUnsavedChanges: WritableSignal<boolean> = signal(false)
    private fb = inject(FormBuilder)
    readonly form = this.fb.group({
        title: this.fb.control('', Validators.required),
        description: this.fb.control(''),
        questions: this.fb.array<FormGroup>([], Validators.minLength(1)),
    })
    private bottomSheet = inject(MatBottomSheet)
    private dialog = inject(MatDialog)
    private router = inject(Router)

    get questions(): FormArray {
        return this.form.get('questions') as FormArray
    }

    ngOnInit(): void {
        if (this.questions.length === 0) {
            this.addQuestion('text')
        }
        this.hasQuestions.set(this.questions.length > 0)
        this.hasUnsavedChanges.set(this.form.dirty)

        this.questions.valueChanges.subscribe((list) =>
            this.hasQuestions.set((list as never[]).length > 0)
        )
        this.form.valueChanges.subscribe(() =>
            this.hasUnsavedChanges.set(this.form.dirty)
        )
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnload(event: BeforeUnloadEvent): void {
        if (this.hasUnsavedChanges()) {
            event.returnValue = true
        }
    }

    openAddQuestionSheet(): void {
        this.bottomSheet
            .open(QuestionTypeSheetComponent)
            .afterDismissed()
            .subscribe((type: QuestionType | undefined) => {
                if (type) {
                    this.addQuestion(type)
                }
            })
    }

    removeQuestion(index: number): void {
        this.questions.removeAt(index)
        // reindex orders
        this.questions.controls.forEach((ctrl, i) =>
            ctrl.get('order')!.setValue(i)
        )
    }

    drop(event: CdkDragDrop<FormGroup[]>): void {
        moveItemInArray(
            this.questions.controls,
            event.previousIndex,
            event.currentIndex
        )
        this.questions.controls.forEach((ctrl, i) =>
            ctrl.get('order')!.setValue(i)
        )
    }

    discard(): void {
        this.router.navigate(['/'])
    }

    review(): void {
        if (this.form.invalid || !this.hasQuestions()) {
            this.form.markAllAsTouched()
            return
        }
        const raw = this.questions.getRawValue() as Array<{
            label: string
            type: QuestionType
            options: string[]
            isRequired: boolean
        }>
        const payload: BackendSurvey = {
            title: this.form.value.title!,
            description: this.form.value.description || undefined,
            questions: raw.map((q) => ({
                text: q.label,
                type: this.mapType(q.type),
                options: q.options.length ? q.options : undefined,
                isRequired: q.isRequired,
            })),
        }
        this.router.navigate(['/survey-review'], { state: { survey: payload } })
    }

    private addQuestion(type: QuestionType): void {
        const group = this.fb.group({
            type: this.fb.control(type, Validators.required),
            label: this.fb.control('', Validators.required),
            options: this.fb.control([]),
            isRequired: this.fb.control(false),
            order: this.fb.control(this.questions.length),
        })
        this.questions.push(group)
    }

    private mapType(type: QuestionType): QuestionTypeEnum {
        switch (type) {
            case 'text':
                return QuestionTypeEnum.Text
            case 'single-choice':
                return QuestionTypeEnum.SingleChoice
            case 'multiple-choice':
                return QuestionTypeEnum.MultipleChoice
        }
    }
}
