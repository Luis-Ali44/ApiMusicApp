import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyRepositorio } from '../../api/puertos/spotify-repositorio';
import { Artista } from '../../api/modelos/artista.modelo';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-artista-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artista-detalle.component.html',
  styleUrls: ['./artista-detalle.component.css']
})
export class ArtistaDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotify = inject(SpotifyRepositorio);
  public location = inject(Location);

  artista$!: Observable<Artista>;

  ngOnInit() {
    this.artista$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.spotify.obtenerArtista(id);
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
