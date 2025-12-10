import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './compartidos/sidebar/sidebar.component';
import { BarraBusquedaComponent } from './compartidos/barra-busqueda/barra-busqueda.component';
import { ReproductorControlComponent } from './compartidos/reproductor-control/reproductor-control.component';
import { SpotifyAuthService } from './api/servicios/spotify-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BarraBusquedaComponent, ReproductorControlComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private auth = inject(SpotifyAuthService);

  ngOnInit() {

    this.auth.obtenerToken().subscribe({
      error: (err) => console.error('Error obteniendo token inicial', err)
    });
  }

  onNavegarBusqueda(termino: string) {
    if (termino.trim()) {
      this.router.navigate(['/busqueda'], { queryParams: { q: termino } });
    }
  }
}
