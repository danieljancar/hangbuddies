import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './Landing.component.html',
  styleUrl: './Landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent { }
