import { Injectable, signal } from '@angular/core'
import {
    ExpiringLocalStorageValue,
    FlatLocalStorageKey,
    LOCAL_STORAGE_PREFIX,
} from '../common/storage.constants'

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    setLocalStorage = signal<Date>(new Date())

    set<T = unknown>(key: FlatLocalStorageKey, value: T): void {
        const fullKey = this.buildKey(key)
        localStorage.setItem(fullKey, JSON.stringify(value))
        this.setLocalStorage.set(new Date())
    }

    get<T = unknown>(key: FlatLocalStorageKey): T | null {
        const fullKey = this.buildKey(key)
        const raw = localStorage.getItem(fullKey)
        try {
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    }

    has(key: FlatLocalStorageKey): boolean {
        return localStorage.getItem(this.buildKey(key)) !== null
    }

    remove(key: FlatLocalStorageKey): void {
        localStorage.removeItem(this.buildKey(key))
    }

    getWithExpiry<T = unknown>(key: FlatLocalStorageKey): T | null {
        const data = this.get<ExpiringLocalStorageValue<T>>(key)
        if (!data) return null
        if (Date.now() > data.expiresAt) {
            this.remove(key)
            return null
        }
        return data.value
    }

    setWithExpiry<T = unknown>(
        key: FlatLocalStorageKey,
        value: T,
        expiresInDays: number
    ): void {
        const expiresAt = Date.now() + expiresInDays * 86400000
        const data: ExpiringLocalStorageValue<T> = { value, expiresAt }
        this.set(key, data)
    }

    getAllAppKeys(): string[] {
        return Object.keys(localStorage).filter((key) =>
            key.startsWith(LOCAL_STORAGE_PREFIX)
        )
    }

    debugDump(): Record<string, unknown> {
        const output: Record<string, unknown> = {}
        for (const key of this.getAllAppKeys()) {
            try {
                output[key] = JSON.parse(localStorage.getItem(key)!)
            } catch {
                output[key] = localStorage.getItem(key)
            }
        }
        return output
    }

    private buildKey(rawKey: string): string {
        return `${LOCAL_STORAGE_PREFIX}${rawKey}`
    }
}
