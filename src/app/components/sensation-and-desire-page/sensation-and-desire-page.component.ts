import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Sad, SadNode, SensationAndDesireService } from 'src/app/services/sensation-and-desire.service';
import { SadDialogInput, SensationAndDesireDialogComponent } from '../sensation-and-desire-dialog/sensation-and-desire-dialog.component';

@Component({
  selector: 'app-sensation-and-desire-page',
  templateUrl: './sensation-and-desire-page.component.html',
  styleUrls: ['./sensation-and-desire-page.component.scss']
})
export class SensationAndDesirePageComponent implements OnInit {
  sadNode: SadNode | null = null;
  sads: Sad[] = [];
  muted: boolean = false;

  constructor(
    private _sadService: SensationAndDesireService,
    private _dialog: MatDialog
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
    this._sadService.sadStream.pipe(take(1))
      .subscribe(_ => this.sads = this._sadService.sads);
    this._sadService.sadStream.subscribe((sadNode: SadNode | null) => {
        this.sadNode = sadNode;
      });

    window.onload = () => {
      this.setAudio(true);
    };
  }

  updateSadNode(newCurrentSadId: number | undefined): void {
    newCurrentSadId !== undefined && this._sadService.updateSadNode(this.sads[newCurrentSadId]);
  }

  openDisclaimerDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.disclaimer
        } as SadDialogInput
      }
    );
  }

  openUpdatesDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.updates
        } as SadDialogInput
      }
    );
  }

  openInstagramDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: 'Currently experiencing technical difficulties (ugh).'
        } as SadDialogInput
      }
    );
  }

  toggleAudio(): void {
    this.setAudio(!this.muted);
  }

  disableScrolling(): boolean {
    if(!this.sadNode) {
      return true;
    }

    const { document: { body } } = window;
    const tempSadContentFull = document.createElement('div');
    tempSadContentFull.className = 'sad-content-full';
    tempSadContentFull.innerText = this.sadNode.contentFull;
    const tempSadContent = document.createElement('div');
    tempSadContent.className = 'sad-content';
    tempSadContent.appendChild(tempSadContentFull);
    body.appendChild(tempSadContent);

    const disable = tempSadContent.offsetHeight <= window.innerHeight;

    body.removeChild(tempSadContent);
    tempSadContent.remove();

    return disable;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  scrollToBottom(): void {
    window.scrollTo(0, window.document.body.scrollHeight);
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
  }

}
