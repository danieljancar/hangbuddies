import {
    Directive,
    HostBinding,
    HostListener,
    inject,
    Input,
    OnChanges,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

/**
 * Scrolls smoothly to a target element in the DOM when the host element is clicked.
 *
 * Supports scrolling to a DOM element via:
 * - An `id` (`targetId` input)
 * - Any valid CSS selector (`selector` input)
 *
 * If both are defined, `selector` takes precedence.
 *
 * @example
 * <!-- Scroll to element with id="get-started" -->
 * <button scrollTo targetId="get-started">Scroll to Section</button>
 *
 * <!-- Scroll to first element with class .get-started -->
 * <button scrollTo selector=".get-started">Scroll by Selector</button>
 */
@Directive({
    selector: '[scrollTo]',
    standalone: true,
})
export class ScrollToDirective implements OnChanges {
    @Input() targetId?: string
    @Input() selector?: string

    @HostBinding('attr.href') hrefAttr: string | null = null

    #router = inject(Router)
    #route = inject(ActivatedRoute)

    ngOnChanges() {
        this.hrefAttr =
            !this.selector && this.targetId ? `#${this.targetId}` : null
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.preventDefault()

        const fragment = this.selector?.startsWith('#')
            ? this.selector.slice(1)
            : this.selector
              ? null
              : (this.targetId ?? null)

        if (fragment) {
            this.#router.navigate([], {
                fragment,
                relativeTo: this.#route,
                replaceUrl: true,
            })
        }

        const el = this.selector
            ? document.querySelector(this.selector)
            : this.targetId
              ? document.getElementById(this.targetId)
              : null

        if (el) {
            setTimeout(
                () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                0
            )
        }
    }
}
