import { Directive, HostListener, Input } from '@angular/core'

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
export class ScrollToDirective {
    /**
     * The ID of the element to scroll to. Must match an element's `id` attribute.
     * Ignored if `selector` is provided.
     */
    @Input() targetId?: string

    /**
     * Optional CSS selector to scroll to. Overrides `targetId` if provided.
     */
    @Input() selector?: string

    @HostListener('click')
    onClick(): void {
        const target = this.selector
            ? document.querySelector(this.selector)
            : this.targetId
              ? document.getElementById(this.targetId)
              : null

        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}
