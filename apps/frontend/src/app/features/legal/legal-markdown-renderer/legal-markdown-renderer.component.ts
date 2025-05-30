import { Component, Input } from '@angular/core'
import { LegalDocument } from '../../../types/legal.type'
import { MarkdownModule } from 'ngx-markdown'

@Component({
    selector: 'app-legal-markdown-renderer',
    imports: [MarkdownModule],
    templateUrl: './legal-markdown-renderer.component.html',
    styleUrl: './legal-markdown-renderer.component.scss',
})
export class LegalMarkdownRendererComponent {
    @Input({ required: true }) legal!: LegalDocument
}
