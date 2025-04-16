export const QuestionType = {
    TEXT: 1,
    SINGLE_CHOICE: 3,
    MULTIPLE_CHOICE: 4,
} as const
export type QuestionEnumType = (typeof QuestionType)[keyof typeof QuestionType]
