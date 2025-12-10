import { Routes } from '@angular/router';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { ResultadosBusquedaComponent } from './vistas/resultados-busqueda/resultados-busqueda.component';
import { ArtistaDetalleComponent } from './vistas/artista-detalle/artista-detalle.component';
import { ReproductorDetalleComponent } from './vistas/reproductor-detalle/reproductor-detalle.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'busqueda', component: ResultadosBusquedaComponent },
    { path: 'artista/:id', component: ArtistaDetalleComponent },
    { path: 'album/:id', component: ReproductorDetalleComponent },
    { path: '**', redirectTo: 'inicio' }
];
