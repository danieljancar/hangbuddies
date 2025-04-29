import { Component } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { NgOptimizedImage } from '@angular/common'
import { APP_ROUTES } from '../../../common/routes'
import { RouterLink } from '@angular/router'
import { MatAnchor } from '@angular/material/button'

@Component({
    selector: 'app-footer',
    imports: [MatToolbar, NgOptimizedImage, RouterLink, MatAnchor],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
})
export class FooterComponent {
    protected readonly APP_ROUTES = APP_ROUTES
}
