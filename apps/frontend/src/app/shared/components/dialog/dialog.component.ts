import { Component, Inject } from '@angular/core'
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

export interface DialogData {
    title: string
    message: string
    cancelText?: string
    confirmText?: string
    isLoading?: boolean
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
        MatProgressSpinner,
    ],
    standalone: true,
    template: `
        <h2 mat-dialog-title>{{ data.title }}</h2>
        @if (!data.isLoading) {
            <mat-dialog-content>{{ data.message }}</mat-dialog-content>
        } @else {
            <mat-dialog-content>
                <div class="loading-container">
                    <mat-spinner diameter="25"></mat-spinner>
                </div>
            </mat-dialog-content>
        }
        <mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()" [disabled]="data.isLoading">
                {{ data.cancelText || 'Cancel' }}
            </button>
            <button
                mat-flat-button
                color="warn"
                (click)="onConfirm()"
                [disabled]="data.isLoading"
            >
                {{ data.confirmText || 'Confirm' }}
            </button>
        </mat-dialog-actions>
    `,
    styles: `
        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    `,
})
export class DialogComponent {
    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    toggleLoading(isLoading: boolean | null = null): void {
        if (isLoading !== null) {
            this.data.isLoading = isLoading
        } else {
            this.data.isLoading = !this.data.isLoading
        }
    }

    onCancel(): void {
        if (!this.data.isLoading) {
            this.dialogRef.close(false)
        }
    }

    onConfirm(): void {
        if (!this.data.isLoading) {
            this.dialogRef.close(true)
        }
    }
}
