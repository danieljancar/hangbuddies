import { Component, computed, effect, inject, signal } from '@angular/core'
import { LandingComponent } from './landing/landing.component'
import { LocalStorageService } from '../../utils/local-storage.service'
import { LOCAL_STORAGE_KEYS } from '../../common/storage.constants'
import { MatCheckbox } from '@angular/material/checkbox'

@Component({
    selector: 'app-home',
    imports: [LandingComponent, MatCheckbox],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
})
export class HomeComponent {
    isLandingHidden = signal<boolean>(false)
    landingToggleLabel = computed(() => {
        return this.isLandingHidden() ? 'Reveal' : 'Hide'
    })

    readonly #localStorageService = inject(LocalStorageService)

    constructor() {
        effect(() => {
            this.#localStorageService.setLocalStorage()

            const saved = this.#localStorageService.getWithExpiry<boolean>(
                LOCAL_STORAGE_KEYS.UI_STATE.HIDE_LANDING
            )
            this.isLandingHidden.set(saved ?? false)
        })
    }

    toggleLanding(): void {
        const hidden = !this.isLandingHidden()
        this.isLandingHidden.set(hidden)
        this.#localStorageService.setWithExpiry(
            LOCAL_STORAGE_KEYS.UI_STATE.HIDE_LANDING,
            hidden,
            1
        )
    }
}
