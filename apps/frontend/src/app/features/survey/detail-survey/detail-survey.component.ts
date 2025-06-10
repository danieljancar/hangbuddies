import { Component, OnInit } from '@angular/core'
import { CombinedSurvey, SurveyService } from '../../../core/survey.service'
import { ActivatedRoute } from '@angular/router'
import { MatIcon } from '@angular/material/icon'
import { MatDivider } from '@angular/material/divider'
import { DatePipe } from '@angular/common'
import { QuestionComponent } from './question/question.component'

@Component({
    selector: 'app-detail-survey',
    imports: [MatIcon, MatDivider, DatePipe, QuestionComponent],
    templateUrl: './detail-survey.component.html',
    standalone: true,
    styleUrl: './detail-survey.component.scss',
})
export class DetailSurveyComponent implements OnInit {
    survey: CombinedSurvey = {} as CombinedSurvey
    isLoading: boolean = true

    constructor(
        private readonly surveyService: SurveyService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const surveyId = this.route.snapshot.paramMap.get('id')
        this.surveyService.getCombinedSurvey(surveyId!).subscribe({
            next: (survey: CombinedSurvey) => {
                this.survey = survey
                this.isLoading = false
            },
            error: (error) => {
                console.error('Error fetching survey:', error)
                this.isLoading = false
            },
        })
    }
}
