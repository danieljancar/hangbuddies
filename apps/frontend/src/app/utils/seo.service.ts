import { inject, Injectable } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    #titleService = inject(Title)
    #metaService = inject(Meta)

    updateTitle(title: string): void {
        this.#titleService.setTitle(title)
    }

    updateMetaTag(tag: {
        name?: string
        content: string
        property?: string
    }): void {
        this.#metaService.updateTag(tag)
    }

    updateMetaTags(
        tags: Array<{ name?: string; content: string; property?: string }>
    ): void {
        tags.forEach((tag) => this.updateMetaTag(tag))
    }

    removeMetaTag(name: string): void {
        this.#metaService.removeTag(`name='${name}'`)
    }
}
