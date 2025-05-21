import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BlogTagType } from '../../../../../types/blog-tag.type'
import { NgClass } from '@angular/common'
import { APP_ROUTES } from '../../../../../common/routes'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-blog-tag',
    imports: [NgClass, MatButtonModule],
    templateUrl: './blog-tag.component.html',
    standalone: true,
    styleUrls: ['./blog-tag.component.scss'], // Fixed typo: `styleUrl` -> `styleUrls`
})
export class BlogTagComponent {
    readonly APP_ROUTES = APP_ROUTES

    /**
     * The tag to display, can be a BlogTagType or a string.
     * It is recommended to use a BlogTagType for better functionality and the support of click events.
     */
    @Input() tag!: BlogTagType | string // Use definite assignment assertion to ensure type safety.

    /**
     * Tag Click event only available if the tag is not a string.
     */
    @Output() tagClicked: EventEmitter<BlogTagType> =
        new EventEmitter<BlogTagType>()

    constructor() {}

    onTagClick(): void {
        if (this.isBlogTagType(this.tag)) {
            this.tagClicked.emit(this.tag)
        }

        throw new Error(
            'Tag click event failed, `cause on type of provided tag'
        )
    }

    /**
     * Type guard to check if the tag is of type BlogTagType.
     */
    private isBlogTagType(tag: BlogTagType | string): tag is BlogTagType {
        return typeof tag !== 'string'
    }

    getKeyValue<K extends keyof BlogTagType>(
        tag: BlogTagType | string,
        key: K
    ): BlogTagType[K] {
        if (this.isBlogTagType(tag)) {
            return tag[key]
        }
        return tag as BlogTagType[K] // Fallback to string if not a BlogTagType
    }
}
