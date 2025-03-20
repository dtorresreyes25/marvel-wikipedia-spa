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
    <header>
      <h1>Marvel Heroes</h1>
      <button mat-raised-button color="primary" (click)="addHero()">Create Hero</button>
    </header>

    <main>
      <app-hero-filter (onFilterChange)="searchHeroes($event)"></app-hero-filter>
      <app-hero-table
        [data]="heroes$ | async"
        (onHeroEdited)="editHero($event)"
        (onHeroSelected)="viewHero($event)"
        (onHeroDeleted)="deleteHero($event)"
      ></app-hero-table>
    </main>
  `,
  styles: [
    `
      button {
        margin: 1rem;
        float: right;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
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

  editHero(hero: HeroEntity): void {
    this.viewModel.editHero(hero);
  }

  deleteHero(heroId: string): void {
    this.viewModel.deleteHero(heroId);
  }
}
