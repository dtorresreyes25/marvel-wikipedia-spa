import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroTableComponent } from './presentation/components/table/table.component';
import { HeroEntity } from './domain/entities/hero.entity';
import { HeroMapper } from './domain/mapper/hero.mapper';

@Component({
  selector: 'app-root',
  template: ` <app-hero-table [data]="tableData"></app-hero-table> `,
  standalone: true,
  imports: [RouterOutlet, HeroTableComponent]
})
export class AppComponent {
  tableData: HeroEntity[] = [];

  constructor() {
    this.tableData = HeroMapper.fromApi([
      {
        nameLabel: 'Ahab',
        genderLabel: 'male',
        citizenshipLabel: 'United States of America',
        skillsLabel: 'superhuman strength',
        occupationLabel: 'psychologist',
        memberOfLabel: 'Horsemen of Apocalypse',
        creatorLabel: 'Walt Simonson'
      },
      {
        nameLabel: 'Anya Corazon',
        genderLabel: 'female',
        citizenshipLabel: 'United States of America',
        skillsLabel: 'superhuman strength',
        occupationLabel: 'student',
        memberOfLabel: 'The Spider Society',
        creatorLabel: 'Fiona Avery'
      },
      {
        nameLabel: 'Banshee',
        genderLabel: 'male',
        citizenshipLabel: 'Ireland',
        skillsLabel: 'sonic scream',
        occupationLabel: 'criminal',
        memberOfLabel: 'Interpol',
        creatorLabel: 'Roy Thomas'
      }
    ]);
  }
}
