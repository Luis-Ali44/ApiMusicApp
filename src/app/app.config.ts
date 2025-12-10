import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spotifyInterceptor } from './api/spotify.interceptor';
import { SpotifyRepositorio } from './api/puertos/spotify-repositorio';
import { SpotifyHttpService } from './api/adaptadores/spotify-http.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([spotifyInterceptor])),
    { provide: SpotifyRepositorio, useClass: SpotifyHttpService }
  ]
};
