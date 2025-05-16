import { Component } from '@angular/core'
import { MatAnchor } from '@angular/material/button'
import { ScrollToDirective } from '../../../../shared/directives'
import { MatIcon } from '@angular/material/icon'
import { APP_ROUTES } from '../../../../common/routes'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-comparison-cta',
    imports: [ScrollToDirective, MatAnchor, MatIcon, RouterLink],
    templateUrl: './comparison-cta.component.html',
    styleUrl: './comparison-cta.component.scss',
    standalone: true,
})
export class ComparisonCtaComponent {
    protected readonly APP_ROUTES = APP_ROUTES
}
