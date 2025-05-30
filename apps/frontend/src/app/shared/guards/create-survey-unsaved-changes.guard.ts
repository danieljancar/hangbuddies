import { Injectable, inject } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { CreateSurveyComponent } from '../../features/survey/create-survey/create-survey.component'
import {
    DialogComponent,
    DialogData,
} from '../components/dialog/dialog.component'

@Injectable({ providedIn: 'root' })
export class CreateSurveyUnsavedChangesGuard
    implements CanDeactivate<CreateSurveyComponent>
{
    private dialog = inject(MatDialog)

    canDeactivate(
        component: CreateSurveyComponent
    ): Observable<boolean> | boolean {
        // If no unsaved changes, allow navigation immediately
        if (!component.hasUnsavedChanges()) {
            return true
        }

        const data: DialogData = {
            title: 'Discard changes?',
            message: 'You have unsaved changes. Discard and leave?',
            confirmText: 'Discard',
        }
        return this.dialog.open(DialogComponent, { data }).afterClosed()
    }
}
