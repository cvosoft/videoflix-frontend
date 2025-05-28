// serien-übersicht.component.ts
import { Component, OnInit } from '@angular/core';
import { Predigt, Serie } from '../models/models';
import { SerieService } from '../services/serie.service';
import { PredigtService } from '../services/predigt.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';


@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-serien-übersicht',
  templateUrl: './video-offer.component.html',
  styleUrls: ['./video-offer.component.scss'], // <– Hier hinzufügen!
})
export class VideoOfferComponent implements OnInit {
  serien: Serie[] = [];
  predigten: Predigt[] = [];
  isPreviewPlaying = true;
  selectedPredigt: Predigt | null = null;

  isMobile: boolean = window.innerWidth < 500;
  showHeroOnMobile: boolean = false;

  onResize() {
    this.isMobile = window.innerWidth < 500;
  }

  constructor(private PredigtService: PredigtService, private serieService: SerieService, private router: Router) { }

  slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // alles außer a-z und 0-9 durch "-" ersetzen
      .replace(/^-+|-+$/g, '');     // führende und abschließende "-" entfernen
  }

  ngOnInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    this.serieService.getSerien().subscribe((data) => {
      this.serien = data;
    });
    this.PredigtService.getPredigten().subscribe((data) => {
      this.predigten = data;
      this.selectedPredigt = this.predigten[0];
    });

  }

  onFolgeClick(predigt: Predigt): void {
    this.selectedPredigt = predigt;
    if (this.isMobile) {
      this.showHeroOnMobile = true;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    //console.log(this.isMobile, this.showHeroOnMobile);

  }

  onPlayClick(predigt: Predigt | null): void {
    if (!predigt) return;
    const slug = this.slugify(predigt.title);
    this.router.navigate(['/predigt', `${predigt.id}-${slug}`]);
  }

  onBackClick() {
    this.showHeroOnMobile = false;
  }


}