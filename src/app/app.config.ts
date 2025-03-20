import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HeroRepository } from './domain/repository/hero.repository';
import { HeroRepositoryService } from './infraestructure/hero-repository/hero-repository.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HeroRepository, useExisting: HeroRepositoryService }
  ]
};
