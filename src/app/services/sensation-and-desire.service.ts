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
  disclaimer: string;
  updates: string;
  notice: string;
  sads: Sad[];
};

@Injectable({
  providedIn: 'root'
})
export class SensationAndDesireService {
  private _disclaimer: string | null = null;
  private _updates: string | null = null;
  private _notice: string | null = null;
  private _sads: Sad[] = [];
  private _sadNode: SadNode | null = null;
  private _sadStream: Subject<SadNode | null> = new Subject<SadNode | null>();

  get disclaimer(): string {
    return this._disclaimer || '';
  }

  get updates(): string {
    return this._updates || '';
  }

  get notice(): string {
    return this._notice || '';
  }

  get sads(): Sad[] {
    return this._sads;
  }

  sadStream = this._sadStream.asObservable();

  constructor() {
    fetch('../../../assets/sad-map.json')
      .then(response => response.json())
      .then(({ disclaimer, updates, notice, sads }: SadMap) => {
          this._disclaimer = disclaimer;
          this._updates = updates;
          this._notice = notice;
          this._sads = sads;
          this.updateSadNode(this.sads[0]);
        });
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
