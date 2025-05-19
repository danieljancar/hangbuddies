export type QuestionType = 'text' | 'single-choice' | 'multiple-choice'

export interface BackendQuestion {
    text: string
    type: 1 | 2 | 3 // 1 = text, 2 = single‐choice, 3 = multiple‐choice
    options?: string[]
    isRequired: boolean
}

export interface BackendSurvey {
    title: string
    description?: string
    questions: BackendQuestion[]
}
