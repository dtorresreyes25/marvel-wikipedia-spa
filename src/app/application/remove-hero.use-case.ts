import { Injectable } from '@angular/core';
import { HeroRepository } from '../domain/repository/hero.repository';

@Injectable({
  providedIn: 'root'
})
export class RemoveHeroUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(heroId: string): void {
    this.heroRepository.removeHero(heroId);
  }
}
