import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredigtService } from '../services/predigt.service';
import { Predigt } from '../models/models';
import { VideoPlayerComponent } from '../video-player/video-player.component';


@Component({
  selector: 'app-video-detail',
  imports: [VideoPlayerComponent],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {
  predigt!: Predigt;

  constructor(
    private route: ActivatedRoute,
    private predigtService: PredigtService
  ) { }

  ngOnInit(): void {
    const idSlug = this.route.snapshot.paramMap.get('idSlug');
    const id = idSlug?.split('-')[0];
    if (id) {
      this.predigtService.getPredigtById(+id).subscribe((data) => {
        this.predigt = data;
      });
    }
  }
}


