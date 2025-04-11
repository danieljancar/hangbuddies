import { Component, inject, OnInit } from '@angular/core'
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterOutlet,
} from '@angular/router'
import { SeoService } from './utils/seo.service'
import { filter, map, mergeMap } from 'rxjs'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent implements OnInit {
    private router = inject(Router)
    private activatedRoute = inject(ActivatedRoute)
    private seoService = inject(SeoService)

    public ngOnInit() {
        this.updateMetaOnNavigation()
    }

    private updateMetaOnNavigation() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
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
                    this.seoService.updateTitle(data['metaTitle'])
                }

                if (data['metaTags']) {
                    this.seoService.updateMetaTags(data['metaTags'])
                }
            })
    }
}
