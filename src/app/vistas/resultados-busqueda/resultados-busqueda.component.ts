import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpotifyRepositorio } from '../../api/puertos/spotify-repositorio';
import { Observable, switchMap, map } from 'rxjs';
import { Artista } from '../../api/modelos/artista.modelo';
import { Album } from '../../api/modelos/album.modelo';
import { Cancion } from '../../api/modelos/cancion.modelo';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})
export class ResultadosBusquedaComponent implements OnInit {
  route = inject(ActivatedRoute);
  private spotify = inject(SpotifyRepositorio);
  resultados$!: Observable<{ artistas: Artista[], albumes: Album[], canciones: Cancion[] }>;

  ngOnInit() {
    this.resultados$ = this.route.queryParams.pipe(
      switchMap(params => {
        const query = params['q'];
        if (query) {
          return this.spotify.buscar(query);
        }
        return [];
      })
    ) as Observable<any>;
  }
}
