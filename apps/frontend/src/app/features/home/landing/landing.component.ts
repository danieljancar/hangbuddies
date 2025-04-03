import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

@Component({
    selector: 'app-landing',
    imports: [MatButtonModule, MatIcon],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class LandingComponent {}
