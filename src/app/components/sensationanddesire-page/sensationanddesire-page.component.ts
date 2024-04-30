import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Sad, SadNode, SensationAndDesireService } from 'src/app/services/sensationanddesire.service';

@Component({
  selector: 'app-sensationanddesire-page',
  templateUrl: './sensationanddesire-page.component.html',
  styleUrls: ['./sensationanddesire-page.component.scss']
})
export class SensationAndDesirePageComponent implements OnInit {
  sadNode: SadNode | null = null;
  sads: Sad[] = [];
  muted: boolean = false;

  constructor(
    private sadService: SensationAndDesireService
  ) { }

  get firstSad(): Sad {
    return this.sads[0];
  }

  get lastSad(): Sad {
    return this.sads[this.sads.length - 1];
  }

  ngOnInit(): void {
    // the SensationAndDesireService property `sads` is only populated after the SensationAndDesireService performs the initial fetch;
    // once it has been populated, it won't change during the lifecycle of the app, so we only need to take(1)
    this.sadService.sadStream.pipe(take(1))
      .subscribe(_ => this.sads = this.sadService.sads);
    this.sadService.sadStream.subscribe((sadNode: SadNode | null) => {
        this.sadNode = sadNode;
      });

    /*window.onload = () => {
      this.setAudio(true);
    };*/
  }

  updateSadNode(newCurrentSadId: number | undefined): void {
    newCurrentSadId !== undefined && this.sadService.updateSadNode(this.sads[newCurrentSadId]);
  }

  /*toggleAudio(): void {
    this.setAudio(!this.muted);
  }

  private setAudio(muted: boolean): void {
    this.muted = muted;

    const audioElements = document.getElementsByTagName('audio') as HTMLCollection;
    const audioElement = audioElements.length && audioElements[0] as HTMLAudioElement;
    
    if(audioElement) {
      if(this.muted) {
        audioElement.pause();
      }
      else {
        audioElement.loop = true;
        audioElement.play();
      }
    }
  }*/

}
