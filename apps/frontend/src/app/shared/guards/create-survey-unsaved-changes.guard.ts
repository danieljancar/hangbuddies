import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { CreateSurveyComponent } from '../../features/survey/create-survey/create-survey.component'

export interface CanComponentDeactivate {
    hasUnsavedChanges(): boolean
}

@Injectable({ providedIn: 'root' })
export class CreateSurveyUnsavedChangesGuard
    implements CanDeactivate<CreateSurveyComponent>
{
    constructor(private dialog: MatDialog) {}

    canDeactivate(
        component: CreateSurveyComponent
    ): Observable<boolean> | boolean {
        if (!component.hasUnsavedChanges()) {
            return true
        }
        return component.discard()
    }
}
