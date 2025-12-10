import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyRepositorio } from '../../api/puertos/spotify-repositorio';
import { Album } from '../../api/modelos/album.modelo';
import { Cancion } from '../../api/modelos/cancion.modelo';
import { PlayerService } from '../../api/servicios/player.service';
import { Observable, switchMap, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-reproductor-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reproductor-detalle.component.html',
  styleUrls: ['./reproductor-detalle.component.css']
})
export class ReproductorDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private spotify = inject(SpotifyRepositorio);
  public playerService = inject(PlayerService);

  data$!: Observable<{ album: Album, tracks: Cancion[] }>;

  ngOnInit() {
    this.data$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return combineLatest({
          album: this.spotify.obtenerAlbum(id),
          tracks: this.spotify.obtenerCancionesAlbum(id)
        });
      }),

      map(data => {

        this.playerService.setQueue(data.tracks as any);

        return data;
      })
    );
  }

  playTrack(track: Cancion, queue: Cancion[]) {

    this.playerService.setQueue(queue as any);
    this.playerService.playTrack(track as any);
  }

  playAlbum(tracks: Cancion[]) {
    if (tracks.length > 0) {
      this.playTrack(tracks[0], tracks);
    }
  }

  goBack() {
    this.location.back();
  }
}
