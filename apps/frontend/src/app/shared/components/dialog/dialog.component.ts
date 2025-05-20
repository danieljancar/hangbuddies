import { Component, Inject } from '@angular/core'
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

export interface DialogData {
    title: string
    message: string
    cancelText: string
    confirmText: string
}

@Component({
    selector: 'app-dialog',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogTitle,
    ],
    standalone: true,
    template: `
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <mat-dialog-content>{{ data.message }}</mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">
                {{ data.cancelText || 'Cancel' }}
            </button>
            <button mat-flat-button color="warn" (click)="onConfirm()">
                {{ data.confirmText || 'Confirm' }}
            </button>
        </mat-dialog-actions>
    `,
})
export class DialogComponent {
    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onCancel(): void {
        this.dialogRef.close(false)
    }

    onConfirm(): void {
        this.dialogRef.close(true)
    }
}
