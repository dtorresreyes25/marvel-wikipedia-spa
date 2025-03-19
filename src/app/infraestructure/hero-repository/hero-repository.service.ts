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
  private heroListSubject = new BehaviorSubject<HeroEntity[]>([]);

  constructor(private http: HttpClient) {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.http.get<HeroApiResponse[]>(this.apiUrl).subscribe((response) => {
      const heroes = HeroMapper.fromApi(response);
      this.heroListSubject.next(heroes);
    });
  }

  getHeroes$(): Observable<HeroEntity[]> {
    return this.heroListSubject.asObservable();
  }

  getHeroes(): HeroEntity[] {
    return this.heroListSubject.getValue();
  }

  addHero(hero: HeroEntity): void {
    const heroes = this.getHeroes();
    heroes.push(hero);
    this.heroListSubject.next(heroes);
  }

  removeHero(heroName: string): void {
    const heroes = this.getHeroes();
    const updatedHeroes = heroes.filter((hero) => hero.name !== heroName);
    this.heroListSubject.next(updatedHeroes);
  }
}
