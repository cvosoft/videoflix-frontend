// serien-übersicht.component.ts
import { Component, OnInit } from '@angular/core';
import { Predigt, Serie } from '../models/models';
import { SerieService } from '../services/serie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-serien-übersicht',
  templateUrl: './video-offer.component.html',
  styleUrls: ['./video-offer.component.scss'], // <– Hier hinzufügen!
})
export class VideoOfferComponent implements OnInit {
  serien: Serie[] = [];

  constructor(private serieService: SerieService, private router: Router) { }

  slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // alles außer a-z und 0-9 durch "-" ersetzen
      .replace(/^-+|-+$/g, '');     // führende und abschließende "-" entfernen
  }

  ngOnInit(): void {
    this.serieService.getSerien().subscribe((data) => {
      this.serien = data;
      //console.log(this.serien)
    });
  }

  onFolgeClick(predigt: Predigt): void {

    const slug = this.slugify(predigt.title);
    this.router.navigate(['/predigt', `${predigt.id}-${slug}`]);

  }
}