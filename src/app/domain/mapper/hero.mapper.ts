import { HeroEntity } from '../entities/hero.entity';

interface HeroApiResponse {
  nameLabel: string;
  genderLabel: string;
  citizenshipLabel: string;
  skillsLabel: string;
  occupationLabel: string;
  memberOfLabel: string;
  creatorLabel: string;
}

export class HeroMapper {
  static fromApi(response: HeroApiResponse[]): HeroEntity[] {
    return response.map(
      (hero) =>
        new HeroEntity(
          hero.nameLabel,
          hero.genderLabel,
          hero.citizenshipLabel,
          hero.skillsLabel,
          hero.occupationLabel,
          hero.memberOfLabel,
          hero.creatorLabel
        )
    );
  }
}
