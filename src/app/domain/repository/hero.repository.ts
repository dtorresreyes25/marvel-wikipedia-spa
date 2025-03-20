import { HeroEntity } from '../entities/hero.entity';
import { Observable } from 'rxjs';

export interface HeroApiResponse {
  nameLabel: string;
  genderLabel: string;
  citizenshipLabel: string;
  skillsLabel: string;
  occupationLabel: string;
  memberOfLabel: string;
  creatorLabel: string;
}

export abstract class HeroRepository {
  abstract getHeroes(): HeroEntity[];
  abstract addHero(hero: HeroEntity): void;
  abstract removeHero(heroName: string): void;
  abstract getHeroes$(): Observable<HeroEntity[]>;
  abstract heroExists(heroName: string): boolean;
  abstract editHero(updatedHero: HeroEntity): void;
}
