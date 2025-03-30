import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LandingComponent } from './features/homepage/Landing/Landing.component'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LandingComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent {
    title = 'frontend'
}
