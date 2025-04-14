export const LogLevelType = {
    INFO: 'info',
    WARN: 'warning',
    DEBUG: 'debug',
    VERBOSE: 'verbose',
} as const
export type LogLevelEnumType = (typeof LogLevelType)[keyof typeof LogLevelType]

export const LogCategoryType = {
    SURVEY: 'survey',
    AUTH: 'auth',
    DB: 'db',
    GENERAL: 'general',
    OTHER: 'other',
} as const
export type LogCategoryEnumType =
    (typeof LogCategoryType)[keyof typeof LogCategoryType]
