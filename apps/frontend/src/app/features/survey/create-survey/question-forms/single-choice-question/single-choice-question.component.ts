import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core'
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms'
import {
    CdkDrag,
    CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop'
import {
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
} from '@angular/material/input'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-single-choice-question',
    templateUrl: './single-choice-question.component.html',
    styleUrls: ['./single-choice-question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatError,
        CdkDrag,
        CdkDropList,
        MatInput,
        MatFormField,
        CdkDragHandle,
        MatIcon,
        MatIconButton,
        MatButton,
    ],
    standalone: true,
})
export class SingleChoiceQuestionComponent implements OnInit {
    @Input() group!: FormGroup

    ngOnInit(): void {
        const currentOptions = this.group.get('options')
        if (!(currentOptions instanceof FormArray)) {
            this.group.setControl(
                'options',
                new FormArray([new FormGroup({ label: new FormControl('') })])
            )
        }
    }

    get options(): FormArray {
        return this.group.get('options') as FormArray
    }

    addOption(): void {
        this.options.push(new FormGroup({ label: new FormControl('') }))
    }

    removeOption(index: number): void {
        this.options.removeAt(index)
    }

    drop(event: CdkDragDrop<FormGroup[]>): void {
        const optionsArray = this.options

        const prev = optionsArray.at(event.previousIndex)
        optionsArray.removeAt(event.previousIndex)
        optionsArray.insert(event.currentIndex, prev)
    }
}
