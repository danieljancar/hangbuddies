import {
    Component,
    OnInit,
    HostListener,
    inject,
    signal,
    WritableSignal,
} from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    FormArray,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms'
import {
    MatBottomSheet,
    MatBottomSheetModule,
} from '@angular/material/bottom-sheet'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import {
    DragDropModule,
    CdkDragDrop,
    moveItemInArray,
} from '@angular/cdk/drag-drop'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { Router } from '@angular/router'

import {
    QuestionType,
    QuestionTypeEnum,
    BackendSurvey,
} from '../../../types/survey.types'
import { QuestionTypeSheetComponent } from './question-type-sheet/question-type-sheet.component'
import {
    DialogComponent,
    DialogData,
} from '../../../shared/components/dialog/dialog.component'

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
        QuestionTypeSheetComponent,
    ],
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
    private fb = inject(FormBuilder)
    private bottomSheet = inject(MatBottomSheet)
    private dialog = inject(MatDialog)
    private router = inject(Router)

    readonly hasQuestions: WritableSignal<boolean> = signal(false)
    readonly hasUnsavedChanges: WritableSignal<boolean> = signal(false)

    readonly form = this.fb.group({
        title: this.fb.control('', Validators.required),
        description: this.fb.control(''),
        questions: this.fb.array<FormGroup>([], Validators.minLength(1)),
    })

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
        const data: DialogData = {
            title: 'Discard changes?',
            message: 'You have unsaved changes. Discard and leave?',
            confirmText: 'Discard',
        }
        this.dialog
            .open(DialogComponent, { data })
            .afterClosed()
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.router.navigate(['/'])
                }
            })
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
