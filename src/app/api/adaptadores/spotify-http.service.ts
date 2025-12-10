import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SpotifyRepositorio } from '../puertos/spotify-repositorio';
import { Album } from '../modelos/album.modelo';
import { Artista } from '../modelos/artista.modelo';
import { Cancion } from '../modelos/cancion.modelo';

@Injectable({
    providedIn: 'root'
})
export class SpotifyHttpService implements SpotifyRepositorio {
    private readonly API_URL = 'https://api.spotify.com/v1';

    constructor(private http: HttpClient) { }

    obtenerNuevosLanzamientos(): Observable<Album[]> {
        return this.http.get<any>(`${this.API_URL}/browse/new-releases?limit=20`).pipe(
            map(response => response.albums.items.map((item: any) => this.mapAlbum(item)))
        );
    }

    buscar(termino: string): Observable<{ artistas: Artista[], albumes: Album[], canciones: Cancion[] }> {
        return this.http.get<any>(`${this.API_URL}/search?q=${termino}&type=album,artist,track&limit=10`).pipe(
            map(response => ({
                artistas: response.artists.items.map((i: any) => this.mapArtista(i)),
                albumes: response.albums.items.map((i: any) => this.mapAlbum(i)),
                canciones: response.tracks.items.map((i: any) => this.mapCancion(i))
            }))
        );
    }

    obtenerArtista(id: string): Observable<Artista> {
        return this.http.get<any>(`${this.API_URL}/artists/${id}`).pipe(
            map(item => this.mapArtista(item))
        );
    }

    obtenerAlbum(id: string): Observable<Album> {
        return this.http.get<any>(`${this.API_URL}/albums/${id}`).pipe(
            map(item => this.mapAlbum(item))
        );
    }

    obtenerCancionesAlbum(id: string): Observable<Cancion[]> {

        return this.http.get<any>(`${this.API_URL}/albums/${id}/tracks`).pipe(
            map(response => response.items.map((item: any) => this.mapCancion(item)))
        );
    }



    private mapAlbum(data: any): Album {
        return {
            id: data.id,
            nombre: data.name,
            artistas: data.artists ? data.artists.map((a: any) => ({ id: a.id, nombre: a.name, imagenes: [] })) : [],
            imagenes: data.images || [],
            fechaLanzamiento: data.release_date,
            totalCanciones: data.total_tracks,
            uri: data.uri
        };
    }

    private mapArtista(data: any): Artista {
        return {
            id: data.id,
            nombre: data.name,
            imagenes: data.images || [],
            generos: data.genres,
            popularidad: data.popularity,
            uri: data.uri
        };
    }

    private mapCancion(data: any): Cancion {
        return {
            id: data.id,
            nombre: data.name,
            album: data.album ? this.mapAlbum(data.album) : undefined,
            artistas: data.artists ? data.artists.map((a: any) => ({ id: a.id, nombre: a.name, imagenes: [] })) : [],
            duracionMs: data.duration_ms,
            previewUrl: data.preview_url,
            uri: data.uri,
            explicita: data.explicit
        };
    }
}
