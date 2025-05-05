import { Component } from '@angular/core'
import {
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
} from '@angular/material/sidenav'
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatToolbar } from '@angular/material/toolbar'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { NgOptimizedImage } from '@angular/common'
import { EXTERNAL_LINKS } from '../../../common/link.constants'
import { APP_ROUTES } from '../../../common/routes'
import { CloseDrawerDirective } from '../../directives'
import { FooterComponent } from '../footer/footer.component'

@Component({
    selector: 'app-navbar',
    imports: [
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        MatIconButton,
        MatIcon,
        MatToolbar,
        RouterOutlet,
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive,
        CloseDrawerDirective,
        FooterComponent,
        MatAnchor,
        MatButton,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: true,
})
export class NavbarComponent {
    protected readonly EXTERNAL_LINKS = EXTERNAL_LINKS
    protected readonly APP_ROUTES = APP_ROUTES

    protected onDrawerOpened(): void {
        document.body.style.overflow = 'hidden'
    }

    protected onDrawerClosed(): void {
        document.body.style.overflow = ''
    }
}
