import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpotifyRepositorio } from '../../api/puertos/spotify-repositorio';
import { Album } from '../../api/modelos/album.modelo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  private spotify = inject(SpotifyRepositorio);
  nuevosLanzamientos$!: Observable<Album[]>;

  ngOnInit(): void {
    this.nuevosLanzamientos$ = this.spotify.obtenerNuevosLanzamientos();
  }
}
