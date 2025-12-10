import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-busqueda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  @Output() terminoBusqueda = new EventEmitter<string>();


  onInput(valor: string) {
    this.terminoBusqueda.emit(valor);
  }
}
