import { Routes } from '@angular/router'
import { APP_ROUTES } from './common/routes'
import { HomeComponent } from './features/home/home.component'
import { LANDING_META } from './common/meta.constants'
import { LegalDetailComponent } from './features/legal/legal-detail/legal-detail.component'

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
        path: 'legal/:file',
        component: LegalDetailComponent,
    },
]
