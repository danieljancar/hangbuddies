import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

type QuestionType = 'single' | 'multiple' | 'text' | 'rating'

type Question = {
    id: number
    text: string
    type: QuestionType
    options?: string[]
}

type Answer = {
    respondent: string
    answers: {
        questionId: number
        value: string | string[]
    }[]
}

type Survey = {
    id: number
    title: string
    description: string
    questions: Question[]
    answers: Answer[]
}

@Component({
    selector: 'app-view-survey-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-survey-page.component.html',
    styleUrls: ['./view-survey-page.component.scss'],
})
export class ViewSurveyPageComponent {
    mockSurvey: Survey = {
        id: 1,
        title: 'This is a mock survey',
        description: `This is a mock survey description to help you understand how the survey works.`,
        questions: [
            {
                id: 1,
                text: 'What do you think of our app, Hangbuddies?',
                type: 'text',
            },
            {
                id: 2,
                text: 'Would you recommend us to a friend?',
                type: 'single',
                options: [
                    'option 1: Yes, of course!',
                    'option 2: I am not sure yet',
                    'option 3: No, not a chance',
                ],
            },
        ],
        answers: [
            {
                respondent: 'Erika Musterfrau',
                answers: [
                    { questionId: 1, value: 'I think it is a great project!' },
                    { questionId: 2, value: 'option 1: Yes, of course!' },
                ],
            },
            {
                respondent: 'Max Mustermann',
                answers: [
                    {
                        questionId: 1,
                        value: 'Its cool, love what youve done with it',
                    },
                    { questionId: 2, value: 'option 2: I am not sure yet' },
                ],
            },
            {
                respondent: 'Daniel Hodenkobold',
                answers: [
                    {
                        questionId: 1,
                        value: 'Its amazing, i want the entire world to see the cool sh*t I built',
                    },
                    { questionId: 2, value: 'option 1: Yes, of course!' },
                ],
            },
        ],
    }

    expandedOtherAnswer: string | null = null

    getOtherAnswers(questionId: number, currentRespondent: string) {
        return this.mockSurvey.answers
            .filter((a) => a.respondent !== currentRespondent)
            .map((a) => ({
                respondent: a.respondent,
                firstName: a.respondent.split(' ')[0],
                answer:
                    a.answers.find((ans) => ans.questionId === questionId)
                        ?.value ?? '',
            }))
            .filter((a) => a.answer)
    }

    toggleOtherAnswer(name: string) {
        this.expandedOtherAnswer =
            this.expandedOtherAnswer === name ? null : name
    }

    getOptionStats(questionId: number, option: string): number {
        const relevantAnswers = this.mockSurvey.answers
            .map(
                (a) =>
                    a.answers.find((ans) => ans.questionId === questionId)
                        ?.value
            )
            .filter((v) => typeof v === 'string') as string[]
        const count = relevantAnswers.filter((v) => v === option).length
        return relevantAnswers.length
            ? Math.round((count / relevantAnswers.length) * 100)
            : 0
    }

    getAnswer(
        answers: { questionId: number; value: string | string[] }[],
        questionId: number,
        type: QuestionType
    ): string {
        const found = answers.find((ans) => ans.questionId === questionId)
        if (!found) return '-'
        if (type === 'multiple' && Array.isArray(found.value)) {
            return found.value.join(', ')
        }
        return typeof found.value === 'string' ? found.value : '-'
    }

    getPieColor(index: number): string {
        const colors = ['#00bcd4', '#ff9800', '#8bc34a', '#e91e63', '#9c27b0']
        return colors[index % colors.length]
    }

    getPieStart(q: Question, i: number): number {
        const stats = q.options!.map((opt) => this.getOptionStats(q.id, opt))
        const total = stats.reduce((a, b) => a + b, 0)
        let sum = 0
        for (let j = 0; j < i; j++) {
            sum += stats[j]
        }
        return (sum / total) * 360
    }

    getPieEnd(q: Question, i: number): number {
        const stats = q.options!.map((opt) => this.getOptionStats(q.id, opt))
        const total = stats.reduce((a, b) => a + b, 0)
        let sum = 0
        for (let j = 0; j <= i; j++) {
            sum += stats[j]
        }
        return (sum / total) * 360
    }

    describeArc(
        cx: number,
        cy: number,
        r: number,
        startAngle: number,
        endAngle: number
    ): string {
        const start = this.polarToCartesian(cx, cy, r, endAngle)
        const end = this.polarToCartesian(cx, cy, r, startAngle)
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
        return [
            'M',
            cx,
            cy,
            'L',
            start.x,
            start.y,
            'A',
            r,
            r,
            0,
            largeArcFlag,
            0,
            end.x,
            end.y,
            'Z',
        ].join(' ')
    }

    polarToCartesian(
        cx: number,
        cy: number,
        r: number,
        angleInDegrees: number
    ) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
        return {
            x: cx + r * Math.cos(angleInRadians),
            y: cy + r * Math.sin(angleInRadians),
        }
    }
}
