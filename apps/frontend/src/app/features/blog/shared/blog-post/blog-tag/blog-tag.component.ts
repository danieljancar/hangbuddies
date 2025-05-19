import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BlogTagType } from '../../../../../types/blog-tag.type'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-blog-tag',
    imports: [NgClass],
    templateUrl: './blog-tag.component.html',
    standalone: true,
    styleUrl: './blog-tag.component.scss',
})
export class BlogTagComponent {
    @Input() tag: BlogTagType = {} as BlogTagType

    @Output() tagClicked: EventEmitter<BlogTagType> =
        new EventEmitter<BlogTagType>()

    constructor() {}

    onTagClick(): void {
        this.tagClicked.emit(this.tag)
    }
}
