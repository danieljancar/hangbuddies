export type QuestionType = 'text' | 'single-choice' | 'multiple-choice'

export enum QuestionTypeEnum {
    Text = 1,
    SingleChoice = 2,
    MultipleChoice = 3,
}

export interface BackendQuestion {
    text: string
    type: 1 | 2 | 3
    options?: string[]
    isRequired: boolean
}

export interface BackendSurvey {
    title: string
    description?: string
    questions: BackendQuestion[]
}
