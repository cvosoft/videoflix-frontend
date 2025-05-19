import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import Hls from 'hls.js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player', { static: true }) playerRef!: ElementRef<HTMLVideoElement>;
  @Input() src!: string;

  private plyrInstance!: Plyr;
  private hlsInstance?: Hls;
  private resolutionMap = ['120p', '360p', '720p', '1080p'];

  audioTracks: { id: number; name: string }[] = [];
  currentAudioTrack = 0;
  qualityLevels: { id: number; label: string }[] = [];
  currentQualityLevel = -1; // -1 = auto



  constructor(private cdr: ChangeDetectorRef) { }


  ngAfterViewInit(): void {
    console.log('🎬 Videoquelle:', this.src);
    const video = this.playerRef.nativeElement;


    if (this.src.endsWith('.m3u8') && Hls.isSupported()) {
      this.hlsInstance = new Hls();
      this.hlsInstance.loadSource(this.src);
      this.hlsInstance.attachMedia(video);

      this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!this.hlsInstance) return;
        this.plyrInstance = new Plyr(video);
        // Levels auslesen
        this.qualityLevels = this.hlsInstance!.levels.map((level, i) => ({
          id: i,
          label: this.resolutionMap[i] || `Stufe ${i}`
        }));
        // "Auto" hinzufügen als -1
        console.log('HLS Levels:', this.hlsInstance.levels);
        this.qualityLevels.unshift({ id: -1, label: 'Auto' });
        // Angular zum Neurendern zwingen
        this.cdr.detectChanges();


      });

      this.hlsInstance.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_, data) => {
        this.audioTracks = data.audioTracks.map((track: any, index: number) => ({
          id: index,
          name: track.name || track.language || `Track ${index + 1}`
        }));
      });

      this.hlsInstance.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_, data) => {
        this.currentAudioTrack = data.id;
      });
    } else {
      video.src = this.src;
      this.plyrInstance = new Plyr(video);
    }
  }

  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const index = Number(target.value);
    if (!isNaN(index) && this.hlsInstance) {
      this.hlsInstance.audioTrack = index;
    }
  }

  changeQuality(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const level = Number(target.value);
   
    if (!isNaN(level) && this.hlsInstance) {
      this.hlsInstance.currentLevel = level;
      this.currentQualityLevel = level;

      const label = level === -1 ? 'Auto' : this.resolutionMap[level] || `Stufe ${level}`;
      console.log(`🔁 Qualität umgeschaltet: ${label}`);
    }
  }

  ngOnDestroy(): void {
    this.plyrInstance?.destroy();
    this.hlsInstance?.destroy();
  }
}
