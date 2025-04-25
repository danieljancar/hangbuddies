import { Component, effect, inject } from '@angular/core'
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
    protected hideLanding: boolean = false
    readonly #localStorageService = inject(LocalStorageService)

    constructor() {
        effect(() => {
            this.#localStorageService.setLocalStorage()
            this.hideLanding =
                this.#localStorageService.getWithExpiry(
                    LOCAL_STORAGE_KEYS.UI_STATE.HIDE_LANDING
                ) ?? false
        })
    }
}
