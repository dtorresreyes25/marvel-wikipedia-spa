import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroApiResponse, HeroRepository } from '../../domain/repository/hero.repository';

@Injectable({
  providedIn: 'root'
})
export class HeroRepositoryService extends HeroRepository {
  private readonly apiUrl = 'assets/heroes.json';

  constructor(private http: HttpClient) {
    super();
  }

  getHeroes(): Observable<HeroApiResponse[]> {
    return this.http.get<HeroApiResponse[]>(this.apiUrl);
  }
}
