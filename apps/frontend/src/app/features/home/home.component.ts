import { Component } from '@angular/core'
import { LandingComponent } from './landing/landing.component'

@Component({
    selector: 'app-home',
    imports: [LandingComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
