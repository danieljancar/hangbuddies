import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { APP_ROUTES } from '../../../common/routes'
import { GetStartedComponent } from './get-started/get-started.component'
import { ScrollToDirective } from '../../../shared/directives'

@Component({
    selector: 'app-landing',
    imports: [
        MatButtonModule,
        RouterLink,
        MatIconModule,
        GetStartedComponent,
        ScrollToDirective,
    ],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class LandingComponent {
    protected readonly APP_ROUTES = APP_ROUTES
}
