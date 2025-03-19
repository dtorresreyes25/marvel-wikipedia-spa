import { Injectable } from '@angular/core';
import { HeroRepository } from '../domain/repository/hero.repository';

@Injectable({
  providedIn: 'root'
})
export class RemoveHeroUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(heroName: string): void {
    if (!this.heroRepository.heroExists(heroName)) {
      throw new Error('The hero does not exist in the list.');
    }

    this.heroRepository.removeHero(heroName);
  }
}
