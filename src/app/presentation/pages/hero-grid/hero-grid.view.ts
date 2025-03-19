import { Injectable } from '@angular/core';
import { AddHeroUseCase } from '../../../application/add-hero.use-case';
import { RemoveHeroUseCase } from '../../../application/remove-hero.use-case';
import { SearchHeroesUseCase } from '../../../application/search-hero.use-case';
import { HeroEntity } from '../../../domain/entities/hero.entity';
import { Observable } from 'rxjs';
import { GetHeroesUseCase } from '../../../application/get-heroes.use-case';

@Injectable()
export class HeroGridPageViewModel {
  constructor(
    private getHeroesUseCase: GetHeroesUseCase,
    private addHeroUseCase: AddHeroUseCase,
    private removeHeroUseCase: RemoveHeroUseCase,
    private searchHeroesUseCase: SearchHeroesUseCase
  ) {}

  getHeroes(): Observable<HeroEntity[]> {
    return this.getHeroesUseCase.execute();
  }

  searchHeroes(terms: string[]): Observable<HeroEntity[]> {
    return this.searchHeroesUseCase.execute(terms);
  }

  addHero(hero: HeroEntity): void {
    this.addHeroUseCase.execute(hero);
  }

  removeHero(heroName: string): void {
    this.removeHeroUseCase.execute(heroName);
  }
}
