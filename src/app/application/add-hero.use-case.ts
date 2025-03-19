import { Injectable } from '@angular/core';
import { HeroRepository } from '../domain/repository/hero.repository';
import { HeroEntity } from '../domain/entities/hero.entity';

@Injectable({
  providedIn: 'root'
})
export class AddHeroUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(hero: HeroEntity): void {
    if (this.heroRepository.heroExists(hero.name)) {
      throw new Error('The hero already exists in the list.');
    }

    this.heroRepository.addHero(hero);
  }
}
