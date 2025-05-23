import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
    selector: 'app-text-question',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div [formGroup]="group">
            <mat-form-field appearance="outline" class="question__field">
                <mat-label>Question</mat-label>
                <input
                    matInput
                    formControlName="label"
                    placeholder="Your question…"
                />
                @if (
                    group.get('label')?.hasError('required') &&
                    group.get('label')?.touched
                ) {
                    <mat-error>Question text is required</mat-error>
                }
            </mat-form-field>
        </div>
    `,
    styles: [
        `
            .question__field {
                width: 100%;
                margin: 0;
            }
        `,
    ],
})
export class TextQuestionComponent {
    @Input() group!: FormGroup
}
