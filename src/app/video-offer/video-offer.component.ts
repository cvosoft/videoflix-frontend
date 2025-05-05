// serien-übersicht.component.ts
import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/models';
import { SerieService } from '../services/serie.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-serien-übersicht',
  templateUrl: './video-offer.component.html',
})
export class VideoOfferComponent implements OnInit {
  serien: Serie[] = [];

  constructor(private serieService: SerieService) { }

  ngOnInit(): void {
    this.serieService.getSerien().subscribe((data) => {
      this.serien = data;
    });
  }

  onFolgeClick(videoUrl: string) {
    // Hier kannst du später einen Video-Player öffnen oder z. B. ein Modal starten
    console.log('Video öffnen:', videoUrl);
  }
}