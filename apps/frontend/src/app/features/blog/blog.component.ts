import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-blog',
    imports: [RouterOutlet],
    templateUrl: './blog.component.html',
    standalone: true,
    styleUrl: './blog.component.scss',
})
export class BlogComponent {}
