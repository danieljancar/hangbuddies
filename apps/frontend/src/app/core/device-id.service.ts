import { inject, Injectable } from '@angular/core'
import { LocalStorageService } from '../utils/local-storage.service'
import { LOCAL_STORAGE_KEYS } from '../common/storage.constants'

@Injectable({
    providedIn: 'root',
})
export class DeviceIdService {
    #localStorage = inject(LocalStorageService)
    #key = LOCAL_STORAGE_KEYS.DEVICE.ID
    #deviceId = this.#localStorage.get<string>(this.#key)

    constructor() {
        if (!this.#deviceId) {
            this.#deviceId = this.generateId()
            this.#localStorage.set(this.#key, this.#deviceId)
        }
    }

    get id(): string {
        return this.#deviceId!
    }

    private generateId(): string {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID()
        }
        return `${Date.now().toString(36)}-${Math.random()
            .toString(36)
            .substring(2, 9)}`
    }
}
