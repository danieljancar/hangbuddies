import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
    selector: 'app-text-question',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div [formGroup]="group">
            <mat-form-field appearance="outline" class="question__field">
                <mat-label>Text</mat-label>
                <input
                    matInput
                    formControlName="label"
                    placeholder="Your question…"
                />
                @if (
                    group.get('label')?.hasError('required') &&
                    group.get('label')?.touched
                ) {
                    <mat-error> Question text is required</mat-error>
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
