import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroRepository } from '../domain/repository/hero.repository';
import { HeroEntity } from '../domain/entities/hero.entity';

@Injectable({
  providedIn: 'root'
})
export class GetHeroesUseCase {
  constructor(private heroRepository: HeroRepository) {}

  execute(): Observable<HeroEntity[]> {
    return this.heroRepository.getHeroes$();
  }
}
