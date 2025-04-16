export const LogLevelType = {
    INFO: 'info',
    WARN: 'warning',
    DEBUG: 'debug',
    VERBOSE: 'verbose',
} as const
export type LogLevelEnumType = (typeof LogLevelType)[keyof typeof LogLevelType]

export const LogCategoryType = {
    GENERAL: 'general',
    SURVEY: 'survey',
    DEVICE: 'device',
    SECURITY: 'security',
    DB: 'db',
    EXCEPTION: 'exception',
    OTHER: 'other',
} as const
export type LogCategoryEnumType =
    (typeof LogCategoryType)[keyof typeof LogCategoryType]
