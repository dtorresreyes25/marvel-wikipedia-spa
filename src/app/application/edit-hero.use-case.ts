import { Injectable } from '@angular/core';
import { HeroRepository } from '../domain/repository/hero.repository';
import { HeroEntity } from '../domain/entities/hero.entity';

@Injectable({
  providedIn: 'root'
})
export class EditHeroUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(hero: HeroEntity): void {
    this.heroRepository.editHero(hero);
  }
}
