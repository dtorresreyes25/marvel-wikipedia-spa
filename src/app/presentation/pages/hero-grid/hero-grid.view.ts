import { Injectable } from '@angular/core';
import { AddHeroUseCase } from '../../../application/add-hero.use-case';
import { RemoveHeroUseCase } from '../../../application/remove-hero.use-case';
import { SearchHeroesUseCase } from '../../../application/search-hero.use-case';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { Observable } from 'rxjs';
import { GetHeroesUseCase } from '../../../application/get-heroes.use-case';
import { MatDialog } from '@angular/material/dialog';
import { HeroViewComponent } from '../../components/hero-view/hero-view.component';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { EditHeroUseCase } from '../../../application/edit-hero.use-case';

@Injectable()
export class HeroGridPageViewModel {
  constructor(
    private dialog: MatDialog,
    private addHeroUseCase: AddHeroUseCase,
    private editHeroUseCase: EditHeroUseCase,
    private getHeroesUseCase: GetHeroesUseCase,
    private removeHeroUseCase: RemoveHeroUseCase,
    private searchHeroesUseCase: SearchHeroesUseCase
  ) {}

  getHeroes(): Observable<HeroEntity[]> {
    return this.getHeroesUseCase.execute();
  }

  searchHeroes(terms: string[]): Observable<HeroEntity[]> {
    return this.searchHeroesUseCase.execute(terms);
  }

  addHero(): void {
    const dialogRef = this.dialog.open(HeroFormComponent);

    dialogRef.afterClosed().subscribe((newHero: HeroEntity | undefined) => {
      if (newHero) {
        this.addHeroUseCase.execute(newHero);
      }
    });
  }

  editHero(hero: HeroEntity): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      data: hero
    });

    dialogRef.afterClosed().subscribe((updatedHero) => {
      if (updatedHero) {
        this.editHeroUseCase.execute(updatedHero);
      }
    });
  }

  deleteHero(heroId: string): void {
    this.removeHeroUseCase.execute(heroId);
  }

  viewHero(hero: HeroEntity): void {
    this.dialog.open(HeroViewComponent, { data: hero });
  }
}
