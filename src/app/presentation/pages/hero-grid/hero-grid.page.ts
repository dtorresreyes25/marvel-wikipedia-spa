import { Component, OnInit } from '@angular/core';
import { HeroTableComponent } from '../../components/table/table.component';
import { HeroFilterComponent } from '../../components/filter/filter.component';
import { Observable } from 'rxjs';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { HeroGridPageViewModel } from './hero-grid.view';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-hero-grid-page',
  template: `
    <button mat-raised-button color="primary" (click)="addHero()">Create Hero</button>
    <app-hero-filter (onFilterChange)="searchHeroes($event)"></app-hero-filter>
    <app-hero-table [data]="heroes$ | async" (onHeroSelected)="viewHero($event)"></app-hero-table>
  `,
  styles: [
    `
      button {
        margin: 1rem;
        float: right;
      }
    `
  ],
  standalone: true,
  providers: [HeroGridPageViewModel],
  imports: [HeroTableComponent, HeroFilterComponent, AsyncPipe, MatButton]
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

  viewHero(hero: HeroEntity): void {
    this.viewModel.viewHero(hero);
  }

  addHero(): void {
    this.viewModel.addHero();
  }

  onEditHero(hero: HeroEntity): void {}
  onRemoveHero(heroName: string): void {}
}
