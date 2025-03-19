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
  abstract getHeroes(): Observable<HeroApiResponse[]>;
}
