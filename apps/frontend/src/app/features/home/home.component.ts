import { Component, effect, inject, signal } from '@angular/core'
import { LandingComponent } from './landing/landing.component'
import { LocalStorageService } from '../../utils/local-storage.service'
import { LOCAL_STORAGE_KEYS } from '../../common/storage.constants'

@Component({
    selector: 'app-home',
    imports: [LandingComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
})
export class HomeComponent {
    protected hideLanding = signal<boolean>(false)
    readonly #localStorageService = inject(LocalStorageService)

    constructor() {
        effect(() => {
            this.hideLanding.set(
                this.#localStorageService.getWithExpiry(
                    LOCAL_STORAGE_KEYS.UI_STATE.HIDE_LANDING
                ) || false
            )
        })
    }
}
