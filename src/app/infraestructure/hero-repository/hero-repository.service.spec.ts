import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroRepositoryService } from './hero-repository.service';
import { HeroEntity } from '../../domain/entities/hero.entity';

describe('HeroRepositoryService', () => {
  let service: HeroRepositoryService;
  let httpMock: HttpTestingController;
  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => localStorageMock[key]);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => (localStorageMock[key] = value));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroRepositoryService]
    });

    service = TestBed.inject(HeroRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should check if hero exists', () => {
    const hero = { id: '1', name: 'Test Hero' } as HeroEntity;
    service.addHero(hero);

    expect(service.heroExists('Test Hero')).toBeTrue();
    expect(service.heroExists('Test Hero2')).toBeFalse();
  });

  it('should not add duplicate hero', () => {
    const hero = { id: '1', name: 'Test Hero' } as HeroEntity;
    service.addHero(hero);
    service.addHero(hero);

    expect(service.getHeroes().length).toBe(1);
  });

  it('should edit existing hero', () => {
    const hero = { id: '1', name: 'Original' } as HeroEntity;
    const updatedHero = { id: '1', name: 'Updated' } as HeroEntity;

    service.addHero(hero);
    service.editHero(updatedHero);

    expect(service.getHeroes()[0].name).toBe('Updated');
  });

  it('should remove hero', () => {
    const hero = { id: '1', name: 'Hero' } as HeroEntity;
    service.addHero(hero);
    service.removeHero('1');

    expect(service.getHeroes().length).toBe(0);
  });

  it('should save heroes to localStorage', () => {
    const hero = { id: '1', name: 'Hero' } as HeroEntity;
    service.addHero(hero);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorageMock['heroes'])).toEqual([hero]);
  });

  afterEach(() => {
    const req = httpMock.expectOne('assets/heroes.json');
    req.flush([]);
    httpMock.verify();
  });
});
