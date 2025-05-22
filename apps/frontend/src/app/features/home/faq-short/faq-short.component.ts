import { Component } from '@angular/core'
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { MatDivider } from '@angular/material/divider'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-faq-short',
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatDivider,
        RouterLink,
    ],
    templateUrl: './faq-short.component.html',
    standalone: true,
    styleUrl: './faq-short.component.scss',
})
export class FaqShortComponent {
    faqs = [
        {
            question: 'How do I create a survey?',
            summary: '',
            answer: 'To create a survey, click on "Create Survey" in the menu and follow the steps.',
        },
        {
            question: 'How do I see past surveys?',
            summary: '',
            answer: 'Go to your survey dashboard to see previously created surveys.',
        },
        {
            question: 'Why isn’t there a login?',
            summary: '',
            answer: 'We wanted a frictionless experience. No registration means you can create and share surveys instantly. However, this also means that all votes are tied to the device you use.',
        },
        {
            question: 'How do I share my survey?',
            summary: '',
            answer: 'After creating a survey, you can share it via the link provided on the summary screen.',
        },
    ]
}
