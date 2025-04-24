import { Component } from '@angular/core'
import {
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
} from '@angular/material/sidenav'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatToolbar } from '@angular/material/toolbar'
import { RouterOutlet } from '@angular/router'
import { NgOptimizedImage } from '@angular/common'

@Component({
    selector: 'app-navbar',
    imports: [
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        MatIconButton,
        MatIcon,
        MatButton,
        MatToolbar,
        RouterOutlet,
        NgOptimizedImage,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: true,
})
export class NavbarComponent {}
