import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type Sad = {
  id: number;
  title: string;
  content: string;
};

export type SadContent = Sad & {
  contentFull: string;
};

export type SadNode = SadContent & {
  previousSad: Sad | null;
  nextSad: Sad | null;
};

export type SadMap = {
  notice: string;
  disclaimer: string;
  updates: string;
  references: string;
  sads: Sad[];
};

@Injectable({
  providedIn: 'root'
})
export class SensationAndDesireService {
  private _notice: string | null = null;
  private _disclaimer: string | null = null;
  private _updates: string | null = null;
  private _references: string | null = null;
  private _sads: Sad[] = [];
  private _sadNode: SadNode | null = null;
  private _sadStream: Subject<SadNode | null> = new Subject<SadNode | null>();
  private _audible: boolean = true;

  get notice(): string {
    return this._notice || '';
  }

  get disclaimer(): string {
    return this._disclaimer || '';
  }

  get updates(): string {
    return this._updates || '';
  }

  get references(): string {
    return this._references || '';
  }

  get sads(): Sad[] {
    return this._sads;
  }

  get audible(): boolean {
    return this._audible;
  }

  sadStream = this._sadStream.asObservable();

  constructor() {
    fetch('../../../assets/sad-map.json')
      .then(response => response.json())
      .then(({ notice, disclaimer, updates, references, sads }: SadMap) => {
          this._notice = notice;
          this._disclaimer = disclaimer;
          this._updates = updates;
          this._references = references;
          this._sads = sads;
          this.updateSadNode(this.sads[0]);
        });
  }

  public toggleAudio(): void {
    this.setAudio(!this._audible);
  }

  public setAudio(audible: boolean): void {
    this._audible = audible;

    const audioElements = document.getElementsByTagName('audio') as HTMLCollection;
    const audioElement = audioElements.length && audioElements[0] as HTMLAudioElement;
    
    if(audioElement) {
      if(this._audible) {
        audioElement.loop = true;
        audioElement.play();
      }
      else {
        audioElement.pause();
      }
    }
  }

  public updateSadNode(newCurrentSad: Sad): void {
    this.getNewSadNode(newCurrentSad)
      .subscribe((sinSoNode: SadNode) => {
          this._sadNode = sinSoNode;
          this._sadStream.next(this._sadNode);
        });
  }

  private getNewSadNode(newCurrentSad: Sad): Observable<SadNode> {
    const sadSubject = new Subject<SadNode>();

    fetch(`../../../assets/sad-content/${newCurrentSad.content}`)
      .then(response => response.text())
      .then((response: string) => {
          sadSubject.next({
            ...newCurrentSad,
            contentFull: response,
            previousSad: ((newCurrentSad.id - 1 >= 0) && this.sads[newCurrentSad.id - 1]) || null,
            nextSad: ((newCurrentSad.id + 1 < this.sads.length) && this.sads[newCurrentSad.id + 1]) || null
          });
        });

    return sadSubject;
  }
}
