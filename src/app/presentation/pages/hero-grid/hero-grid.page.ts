import { Component, OnInit } from '@angular/core';
import { HeroFilterComponent } from '../../components/filter/filter.component';
import { HeroTableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-hero-grid-page',
  template: `
    <app-hero-filter />
    <app-hero-table />
  `,
  styles: [``],
  standalone: true,
  imports: [HeroTableComponent, HeroFilterComponent]
})
export class HeroGridPage implements OnInit {
  ngOnInit(): void {}
}
