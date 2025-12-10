import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpotifyAuthService {
    private readonly CLIENT_ID = '7e0798c258184d29b236d39f7fe62a28';
    private readonly CLIENT_SECRET = 'f0117b55cf5a4b36a01aedfe95268740';
    private readonly TOKEN_URL = 'https://accounts.spotify.com/api/token';

    private tokenSubject = new BehaviorSubject<string | null>(null);
    public token$ = this.tokenSubject.asObservable();

    constructor(private http: HttpClient) { }

    obtenerToken(): Observable<any> {
        const body = new HttpParams()
            .set('grant_type', 'client_credentials')
            .set('client_id', this.CLIENT_ID)
            .set('client_secret', this.CLIENT_SECRET);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post(this.TOKEN_URL, body.toString(), { headers }).pipe(
            tap((response: any) => {
                this.tokenSubject.next(response.access_token);

            })
        );
    }

    getTokenActual(): string | null {
        return this.tokenSubject.value;
    }
}
