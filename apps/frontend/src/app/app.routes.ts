import { Routes } from '@angular/router'
import { APP_ROUTES } from './common/routes'
import { HomeComponent } from './features/home/home.component'
import { LegalDetailComponent } from './features/legal/legal-detail/legal-detail.component'
import { LANDING_META, SURVEY_META } from './common/meta.constants'

export const routes: Routes = [
    {
        path: APP_ROUTES.HOME.LANDING,
        component: HomeComponent,
        data: {
            metaTitle: LANDING_META.metaTitle,
            metaTags: LANDING_META.metaTags,
        },
    },
    {
        path: APP_ROUTES.LEGAL.DETAIL(':file'),
        component: LegalDetailComponent,
    },
    {
        path: APP_ROUTES.SURVEY.CREATE,
        loadComponent: () =>
            import(
                './features/survey/create-survey/create-survey.component'
            ).then((m) => m.CreateSurveyComponent),
        data: {
            metaTitle: SURVEY_META.CREATE_SURVEY.metaTitle,
            metaTags: SURVEY_META.CREATE_SURVEY.metaTags,
        },
    },
]
