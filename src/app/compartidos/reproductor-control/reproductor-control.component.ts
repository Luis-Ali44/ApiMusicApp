import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../api/servicios/player.service';

@Component({
  selector: 'app-reproductor-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reproductor-control.component.html',
  styleUrls: ['./reproductor-control.component.css']
})
export class ReproductorControlComponent {
  player = inject(PlayerService);
  currentTrack$ = this.player.currentTrack$;
  isPlaying$ = this.player.isPlaying$;
}
