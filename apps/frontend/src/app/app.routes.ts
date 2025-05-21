import { Routes } from '@angular/router'
import { APP_ROUTES } from './common/routes'
import { HomeComponent } from './features/home/home.component'
import { BlogComponent } from './features/blog/blog.component'
import { BlogOverviewComponent } from './features/blog/blog-overview/blog-overview.component'
import { LANDING_META } from './common/meta.constants'
import { BlogDetailComponent } from './features/blog/blog-detail/blog-detail.component'

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
]
