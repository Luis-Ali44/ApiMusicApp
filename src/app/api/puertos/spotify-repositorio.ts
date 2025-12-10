import { Observable } from 'rxjs';
import { Artista } from '../modelos/artista.modelo';
import { Album } from '../modelos/album.modelo';
import { Cancion } from '../modelos/cancion.modelo';

export abstract class SpotifyRepositorio {
    abstract obtenerNuevosLanzamientos(): Observable<Album[]>;
    abstract buscar(termino: string): Observable<{ artistas: Artista[], albumes: Album[], canciones: Cancion[] }>;
    abstract obtenerArtista(id: string): Observable<Artista>;
    abstract obtenerAlbum(id: string): Observable<Album>;
    abstract obtenerCancionesAlbum(id: string): Observable<Cancion[]>;
}
