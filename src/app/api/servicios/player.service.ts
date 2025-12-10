import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cancion } from '../modelos/cancion.modelo';
import { Artista } from '../modelos/artista.modelo';

export interface Track extends Cancion {

}

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private currentTrackSubject = new BehaviorSubject<Track | null>(null);
    private isPlayingSubject = new BehaviorSubject<boolean>(false);
    private queueSubject = new BehaviorSubject<Track[]>([]);

    currentTrack$ = this.currentTrackSubject.asObservable();
    isPlaying$ = this.isPlayingSubject.asObservable();
    queue$ = this.queueSubject.asObservable();

    constructor() {

        this.setQueue([
            { id: '1', nombre: 'Bohemian Rhapsody', duracionMs: 354000, artistas: [{ nombre: 'Queen', id: 'q1' } as Artista] } as Track,
            { id: '2', nombre: 'Don\'t Stop Me Now', duracionMs: 209000, artistas: [{ nombre: 'Queen', id: 'q1' } as Artista] } as Track
        ]);
        this.playTrack(this.queueSubject.value[0]);
        this.pause();
    }

    playTrack(track: Track) {
        this.currentTrackSubject.next(track);
        this.isPlayingSubject.next(true);
    }

    setQueue(tracks: Track[]) {
        this.queueSubject.next(tracks);
    }

    addToQueue(track: Track) {
        const currentQueue = this.queueSubject.value;
        this.queueSubject.next([...currentQueue, track]);
    }

    togglePlay() {
        this.isPlayingSubject.next(!this.isPlayingSubject.value);
    }

    pause() {
        this.isPlayingSubject.next(false);
    }

    play() {
        this.isPlayingSubject.next(true);
    }

    next() {

        const current = this.currentTrackSubject.value;
        const queue = this.queueSubject.value;
        if (!current || queue.length === 0) return;

        const index = queue.findIndex(t => t.id === current.id);
        if (index >= 0 && index < queue.length - 1) {
            this.playTrack(queue[index + 1]);
        }
    }

    prev() {
        const current = this.currentTrackSubject.value;
        const queue = this.queueSubject.value;
        if (!current || queue.length === 0) return;

        const index = queue.findIndex(t => t.id === current.id);
        if (index > 0) {
            this.playTrack(queue[index - 1]);
        }
    }
}
