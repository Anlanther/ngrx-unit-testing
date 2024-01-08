import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { AppFeature } from './state/app.state';

import { provideHttpClient } from '@angular/common/http';
import { AppEffects } from './state/app.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [AppFeature.name]: AppFeature.reducer }),
    provideEffects(AppEffects),
    provideStoreDevtools({ name: 'NGRX Unit Test App', maxAge: 15 }),
  ],
};
