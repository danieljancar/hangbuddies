import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatButton } from '@angular/material/button'
import { MatDivider } from '@angular/material/divider'
import { NgOptimizedImage } from '@angular/common'
import { APP_ROUTES } from '../../../common/routes'
import { EXTERNAL_LINKS } from '../../../common/link.constants'

interface FooterLink {
    label: string
    path: string
}

interface FooterSection {
    title: string
    links: FooterLink[]
}

@Component({
    selector: 'app-footer',
    imports: [RouterLink, MatButton, MatDivider, NgOptimizedImage],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
})
export class FooterComponent {
    protected readonly APP_ROUTES = APP_ROUTES
    protected readonly EXTERNAL_LINKS = EXTERNAL_LINKS
    protected readonly sections: FooterSection[] = [
        {
            title: 'Resources',
            links: [
                { label: 'Blog', path: APP_ROUTES.BLOG.OVERVIEW },
                { label: 'FAQ', path: APP_ROUTES.MORE.FAQ },
                { label: 'Docs', path: APP_ROUTES.MORE.DOCS },
                { label: 'Contact', path: APP_ROUTES.MORE.CONTACT },
            ],
        },
        {
            title: 'More',
            links: [
                { label: 'About', path: APP_ROUTES.ABOUT.LANDING },
                { label: 'Status', path: APP_ROUTES.MORE.STATUS },
                { label: 'Contributing', path: APP_ROUTES.MORE.CONTRIBUTING },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy', path: APP_ROUTES.LEGAL.PRIVACY },
                { label: 'Terms', path: APP_ROUTES.LEGAL.TERMS },
                { label: 'Cookies', path: APP_ROUTES.LEGAL.COOKIES },
                { label: 'Code of Conduct', path: APP_ROUTES.LEGAL.COC },
            ],
        },
    ]
}
