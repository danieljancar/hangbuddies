import { Component, OnInit } from '@angular/core'
import { LegalDocument } from '../../types/legal.type'
import { LegalMarkdownRendererComponent } from '../legal/legal-markdown-renderer/legal-markdown-renderer.component'

@Component({
    selector: 'app-about-page',
    standalone: true,
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
    aboutDoc?: LegalDocument
    async ngOnInit() {
        const markdown = await this.fetchMarkdown()
        this.aboutDoc = {
            id: 'about',
            displayType: 'markdown',
            markdown,
        }
    }
    private async fetchMarkdown(): Promise<string> {
        const response = await fetch('/about/about.md')
        return await response.text()
    }
}
