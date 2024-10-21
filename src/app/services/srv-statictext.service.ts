import { Injectable } from '@angular/core';
import { SadMap, SrvSadmapService } from './srv-sadmap.service';

@Injectable({
  providedIn: 'root'
})
export class SrvStaticTextService extends SrvSadmapService {
  private _notice: string = '';
  private _disclaimer: string = '';
  private _acknowledgements: string = '';
  private _mtcbrrAbout: string = '';
  private _mtcbrrUpdates: string = '';
  private _mtcbrrReferences: string = '';

  get notice(): string {
    return this._notice;
  }

  get disclaimer(): string {
    return this._disclaimer
  }

  get acknowledgements(): string {
    return this._acknowledgements;
  }

  get mtcbrrAbout(): string {
    return this._mtcbrrAbout;
  }

  get mtcbrrUpdates(): string {
    return this._mtcbrrUpdates;
  }

  get mtcbrrReferences(): string {
    return this._mtcbrrReferences;
  }

  constructor(
  ) {
    super();

    this.loadSadMap()
      .then((response: SadMap) => {
        this._notice = response.notice;
        this._disclaimer = response.disclaimer;
        this._acknowledgements = response.acknowledgements;
        this._mtcbrrAbout = response.mtcbrrAbout;
        this._mtcbrrUpdates = response.mtcbrrUpdates;
        this._mtcbrrReferences = response.mtcbrrReferences;
      });
  }
}
