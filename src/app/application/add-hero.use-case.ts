import { Injectable } from '@angular/core';
import { HeroRepository } from '../domain/repository/hero.repository';
import { HeroEntity } from '../domain/entities/hero.entity';

@Injectable({
  providedIn: 'root'
})
export class AddHeroUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(heroData: any): void {
    if (this.heroRepository.heroExists(heroData.name)) {
      throw new Error('The hero already exists in the list.');
    }

    const hero = new HeroEntity(
      heroData.name,
      heroData.gender,
      heroData.citizenship,
      heroData.skills,
      heroData.occupation,
      heroData.memberOf,
      heroData.creator
    );

    this.heroRepository.addHero(hero);
  }
}
