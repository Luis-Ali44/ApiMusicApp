import { Imagen } from './imagen.modelo';

export interface Artista {
    id: string;
    nombre: string;
    imagenes: Imagen[];
    generos?: string[];
    popularidad?: number;
    uri?: string;
}
