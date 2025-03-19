import { Component } from '@angular/core';
import { HeroGridPage } from './presentation/pages/hero-grid/hero-grid.page';

@Component({
  selector: 'app-root',
  template: ` <app-hero-grid-page></app-hero-grid-page> `,
  standalone: true,
  imports: [HeroGridPage]
})
export class AppComponent {}
