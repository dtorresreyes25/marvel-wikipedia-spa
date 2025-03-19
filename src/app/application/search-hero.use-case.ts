import { Injectable } from '@angular/core';
import { HeroEntity } from '../domain/entities/hero.entity';
import { HeroRepository } from '../domain/repository/hero.repository';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHeroesUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(terms: string[]): Observable<HeroEntity[]> {
    return this.heroRepository
      .getHeroes$()
      .pipe(
        map((heroes) =>
          terms.length === 0
            ? heroes
            : heroes.filter((hero) =>
                terms.some((term) => hero.name.toLowerCase().includes(term.toLowerCase()))
              )
        )
      );
  }
}
