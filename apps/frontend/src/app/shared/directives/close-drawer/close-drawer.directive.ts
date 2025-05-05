import { Directive, HostListener, Input } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'

/**
 * Closes an Angular Material `MatSidenav` when the host element is clicked.
 *
 * This is especially useful for mobile navigation menus where the drawer should be
 * automatically closed after navigation or interaction (e.g., selecting a menu item).
 *
 * The directive only closes the drawer if:
 * - The drawer exists
 * - The drawer is in `"over"` mode (typically mobile)
 * - The drawer is currently opened
 *
 * @example
 * <mat-sidenav-container>
 *   <mat-sidenav #drawer mode="over">
 *     <button [closeDrawer]="drawer">Close</button>
 *     <a [routerLink]="'/home'" [closeDrawer]="drawer">Home</a>
 *   </mat-sidenav>
 *   <mat-sidenav-content>
 *     <router-outlet></router-outlet>
 *   </mat-sidenav-content>
 * </mat-sidenav-container>
 */
@Directive({
    selector: '[closeDrawer]',
    standalone: true,
})
export class CloseDrawerDirective {
    /**
     * The `MatSidenav` instance to close when this element is clicked.
     */
    @Input() closeDrawer?: MatSidenav

    @HostListener('click')
    handleClick(): void {
        if (this.closeDrawer?.mode === 'over' && this.closeDrawer.opened) {
            this.closeDrawer.close()
        }
    }
}
