import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { SeoService } from './utils/seo.service'
import { filter, map, mergeMap } from 'rxjs'
import { NavbarComponent } from './shared/navigation/navbar/navbar.component'
import { ViewSurveyPageComponent } from './features/home/view-survey/view-survey-page.component'

@Component({
    selector: 'app-root',
    imports: [NavbarComponent, ViewSurveyPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent implements OnInit {
    #router = inject(Router)
    #activatedRoute = inject(ActivatedRoute)
    #seoService = inject(SeoService)

    public ngOnInit() {
        this.updateMetaOnNavigation()
    }

    private updateMetaOnNavigation() {
        this.#router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.#activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild
                    }
                    return route
                }),
                mergeMap((route) => route.data)
            )
            .subscribe((data) => {
                if (data['metaTitle']) {
                    this.#seoService.updateTitle(data['metaTitle'])
                }

                if (data['metaTags']) {
                    this.#seoService.updateMetaTags(data['metaTags'])
                }
            })
    }
}
