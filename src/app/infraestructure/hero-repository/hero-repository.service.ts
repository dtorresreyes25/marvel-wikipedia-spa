import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroEntity } from '../../domain/entities/hero.entity';
import { HeroMapper } from '../../domain/mapper/hero.mapper';

@Injectable({
  providedIn: 'root'
})
export class HeroRepositoryService {
  private readonly apiUrl = 'assets/heroes.json';
  private readonly heroListSubject = new BehaviorSubject<HeroEntity[]>(
    this.loadHeroesFromStorage()
  );

  constructor(private readonly http: HttpClient) {
    if (this.heroListSubject.value.length === 0) {
      this.loadHeroesFromApi();
    }
  }

  private loadHeroesFromApi(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((response) => {
      const heroes = HeroMapper.fromApi(response);
      this.updateHeroes(heroes);
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
      this.updateHeroes([hero, ...this.getHeroes()]);
    }
  }

  editHero(updatedHero: HeroEntity): void {
    const heroes = this.getHeroes().map((hero) =>
      hero.id === updatedHero.id ? updatedHero : hero
    );
    this.updateHeroes(heroes);
  }

  removeHero(heroId: string): void {
    const heroes = this.getHeroes().filter((hero) => hero.id !== heroId);
    this.updateHeroes(heroes);
  }

  private updateHeroes(heroes: HeroEntity[]): void {
    this.heroListSubject.next(heroes);
    this.saveHeroesToStorage(heroes);
  }

  private saveHeroesToStorage(heroes: HeroEntity[]): void {
    localStorage.setItem('heroes', JSON.stringify(heroes));
  }

  private loadHeroesFromStorage(): HeroEntity[] {
    const storedHeroes = localStorage.getItem('heroes');
    return storedHeroes ? JSON.parse(storedHeroes) : [];
  }
}
