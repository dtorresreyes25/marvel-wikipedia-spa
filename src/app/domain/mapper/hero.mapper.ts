import { HeroEntity } from '../entities/hero.entity';
import { HeroApiResponse } from '../repository/hero.repository';

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
