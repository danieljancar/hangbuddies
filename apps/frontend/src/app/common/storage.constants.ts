export const LOCAL_STORAGE_PREFIX = 'hb.'

export const LOCAL_STORAGE_KEYS = {
    UI_STATE: {
        HIDE_LANDING: 'hide_landing',
    },
} as const

export type FlatLocalStorageKey =
    (typeof LOCAL_STORAGE_KEYS.UI_STATE)[keyof typeof LOCAL_STORAGE_KEYS.UI_STATE]

export interface ExpiringLocalStorageValue<T> {
    value: T
    expiresAt: number // timestamp
}
