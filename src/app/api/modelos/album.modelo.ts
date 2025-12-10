import { Imagen } from './imagen.modelo';
import { Artista } from './artista.modelo';

export interface Album {
    id: string;
    nombre: string;
    artistas: Artista[];
    imagenes: Imagen[];
    fechaLanzamiento: string;
    totalCanciones: number;
    uri?: string;
}
