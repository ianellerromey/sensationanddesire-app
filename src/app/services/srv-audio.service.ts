import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { SrvSadmapService } from './srv-sadmap.service';

@Injectable({
  providedIn: 'root'
})
export class SrvAudioService extends SrvSadmapService {
  private _audioSourceFile: string = 'sensationanddesire.mp3';
  private _audioEnabled: boolean = false;

  get audioEnabled(): boolean {
    return this._audioEnabled;
  }

  set audioEnabled(value: boolean) {
    if(this._audioEnabled !== value) {
      this._audioEnabled = value;
      this.setAudio();
    }
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  private setAudio(): void {
    const audioElement = document.getElementById('audio') as HTMLAudioElement;
    
    if(audioElement) {
      if(this.audioEnabled) {
        this.setAudioSource(audioElement);
        audioElement.loop = true;
        setTimeout(() => {
          audioElement.play()
            .catch(console.log);
        });
      }
      else {
        audioElement.pause();
      }
    }
  }

  private setAudioSource(audioElement: HTMLAudioElement): void {
    if(!audioElement.children.namedItem('audioSource')) {
      const audioSourceElement = document.createElement('source');
      audioSourceElement.setAttribute('name', 'audioSource');
      audioSourceElement.type = 'audio/mpeg';
      audioSourceElement.src = `../../../assets/${this._audioSourceFile}`;

      audioElement.appendChild(audioSourceElement);
    }
  }

  private removeAudioSource(audioElement: HTMLAudioElement): void {
    const audioSourceElement = audioElement.children.namedItem('audioSource');

    audioSourceElement && audioElement.removeChild(audioSourceElement);
  }
}
