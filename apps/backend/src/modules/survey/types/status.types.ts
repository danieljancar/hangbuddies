export const StatusType = {
    DRAFT: 1,
    PUBLISHED: 2,
    ARCHIVED: 3,
} as const
export type StatusEnumType = (typeof StatusType)[keyof typeof StatusType]
