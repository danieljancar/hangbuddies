import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { LegalDocument } from '../../../types/legal.type'
import { LegalMarkdownRendererComponent } from '../legal-markdown-renderer/legal-markdown-renderer.component'
import legalJson from '../../../../../public/legal/legal.json'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-legal-detail',
    standalone: true,
    templateUrl: './legal-detail.component.html',
    styleUrl: './legal-detail.component.scss',
    imports: [LegalMarkdownRendererComponent],
})
export class LegalDetailComponent implements OnInit, OnDestroy {
    safeLegalDocument: LegalDocument | undefined
    isLoading = true

    private routeSub?: Subscription

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(async (params) => {
            const file = params.get('file')
            if (!file) return

            const legalMetadata = legalJson as { files: { file: string }[] }

            const fileEntry = legalMetadata.files.find(
                (entry) => entry.file === file
            )
            if (!fileEntry) return

            const markdown = await this.fetchMarkdown(file)

            this.safeLegalDocument = {
                id: file,
                displayType: 'markdown',
                markdown,
            }

            this.isLoading = false
        })
    }

    ngOnDestroy(): void {
        this.routeSub?.unsubscribe()
    }

    private async fetchMarkdown(file: string): Promise<string> {
        const response = await fetch(`/legal/content/${file}.md`)
        return await response.text()
    }
}
