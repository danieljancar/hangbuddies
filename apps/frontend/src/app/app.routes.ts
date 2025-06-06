import { Routes } from '@angular/router'
import { APP_ROUTES } from './common/routes'
import { HomeComponent } from './features/home/home.component'
import { BlogComponent } from './features/blog/blog.component'
import { BlogOverviewComponent } from './features/blog/blog-overview/blog-overview.component'
import { BlogDetailComponent } from './features/blog/blog-detail/blog-detail.component'
import { LegalDetailComponent } from './features/legal/legal-detail/legal-detail.component'
import { LANDING_META, SURVEY_META } from './common/meta.constants'
import { CreateSurveyUnsavedChangesGuard } from './shared/guards/create-survey-unsaved-changes.guard'
import { DetailSurveyComponent } from './features/survey/detail-survey/detail-survey.component'

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
        path: APP_ROUTES.BLOG.OVERVIEW.replace('/', ''),
        component: BlogComponent,
        children: [
            {
                path: '',
                component: BlogOverviewComponent,
            },
            {
                path: ':id',
                component: BlogDetailComponent,
            },
        ],
    },
    {
        path: APP_ROUTES.LEGAL.DETAIL(':file'),
        component: LegalDetailComponent,
    },
    {
        path: APP_ROUTES.SURVEY.OVERVIEW,
        children: [
            {
                path: APP_ROUTES.SURVEY.CREATE.split('/')[1],
                loadComponent: () =>
                    import(
                        './features/survey/create-survey/create-survey.component'
                    ).then((m) => m.CreateSurveyComponent),
                data: {
                    metaTitle: SURVEY_META.CREATE_SURVEY.metaTitle,
                    metaTags: SURVEY_META.CREATE_SURVEY.metaTags,
                },
                canDeactivate: [CreateSurveyUnsavedChangesGuard],
            },
            {
                path: APP_ROUTES.SURVEY.DETAIL(':id').split('/')[1],
                component: DetailSurveyComponent,
            },
            {
                path: '**',
                redirectTo: APP_ROUTES.SURVEY.CREATE.split('/')[1],
            },
        ],
    },
]
