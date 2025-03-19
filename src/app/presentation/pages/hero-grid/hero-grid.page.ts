import { Component, OnInit } from '@angular/core';
import { HeroTableComponent } from '../../components/table/table.component';
import { HeroFilterComponent } from '../../components/filter/filter.component';
import { Observable } from 'rxjs';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { HeroGridPageViewModel } from './hero-grid.view';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-grid-page',
  template: `
    <app-hero-filter (onFilterChange)="searchHeroes($event)"></app-hero-filter>
    <app-hero-table [data]="heroes$ | async"></app-hero-table>
  `,
  standalone: true,
  providers: [HeroGridPageViewModel],
  imports: [HeroTableComponent, HeroFilterComponent, AsyncPipe]
})
export class HeroGridPage implements OnInit {
  heroes$!: Observable<HeroEntity[]>;

  constructor(private viewModel: HeroGridPageViewModel) {}

  ngOnInit(): void {
    this.heroes$ = this.viewModel.getHeroes();
  }

  searchHeroes(terms: string[]): void {
    this.heroes$ = this.viewModel.searchHeroes(terms);
  }

  addHero(hero: HeroEntity): void {}
  onEditHero(hero: HeroEntity): void {}
  onRemoveHero(heroName: string): void {}
}
