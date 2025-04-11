import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { APP_ROUTES } from '../../../common/routes'

@Component({
    selector: 'app-landing',
    imports: [MatButtonModule, RouterLink, MatIconModule],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class LandingComponent {
    protected readonly APP_ROUTES = APP_ROUTES
}
