import { Album } from './album.modelo';
import { Artista } from './artista.modelo';

export interface Cancion {
    id: string;
    nombre: string;
    album?: Album;
    artistas: Artista[];
    duracionMs: number;
    previewUrl?: string | null;
    uri?: string;
    explicita?: boolean;
}
