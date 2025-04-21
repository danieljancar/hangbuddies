export const QuestionType = {
    TEXT: 1,
    SINGLE_CHOICE: 2,
    MULTIPLE_CHOICE: 3,
} as const
export type QuestionEnumType = (typeof QuestionType)[keyof typeof QuestionType]
