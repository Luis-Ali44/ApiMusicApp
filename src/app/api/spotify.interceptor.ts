import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpotifyAuthService } from './servicios/spotify-auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const spotifyInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(SpotifyAuthService);
    const token = authService.getTokenActual();


    if (req.url.includes('api.spotify.com')) {
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    }

    return next(req).pipe(
        catchError((error) => {

            if (error.status === 401 && req.url.includes('api.spotify.com')) {
                return authService.obtenerToken().pipe(
                    switchMap((newToken) => {

                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`
                            }
                        });
                        return next(newReq);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};
