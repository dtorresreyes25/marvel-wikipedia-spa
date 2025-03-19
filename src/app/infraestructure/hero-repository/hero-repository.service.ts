import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroEntity } from '../../domain/entities/hero.entity';
import { HeroApiResponse } from '../../domain/repository/hero.repository';
import { HeroMapper } from '../../domain/mapper/hero.mapper';

@Injectable({
  providedIn: 'root'
})
export class HeroRepository {
  private readonly apiUrl = 'assets/heroes.json';
  private readonly heroListSubject = new BehaviorSubject<HeroEntity[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.http.get<HeroApiResponse[]>(this.apiUrl).subscribe((response) => {
      this.setHeroes(HeroMapper.fromApi(response));
    });
  }

  getHeroes$(): Observable<HeroEntity[]> {
    return this.heroListSubject.asObservable();
  }

  getHeroes(): HeroEntity[] {
    return this.heroListSubject.value;
  }

  heroExists(heroName: string): boolean {
    return this.getHeroes().some((hero) => hero.name.toLowerCase() === heroName.toLowerCase());
  }

  addHero(hero: HeroEntity): void {
    if (!this.heroExists(hero.name)) {
      this.setHeroes([...this.getHeroes(), hero]);
    }
  }

  removeHero(heroName: string): void {
    this.setHeroes(this.getHeroes().filter((hero) => hero.name !== heroName));
  }

  private setHeroes(heroes: HeroEntity[]): void {
    this.heroListSubject.next(heroes);
  }
}
