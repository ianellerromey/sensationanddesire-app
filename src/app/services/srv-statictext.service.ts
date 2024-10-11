import { Injectable } from '@angular/core';
import { SadMap, SrvSadmapService } from './srv-sadmap.service';

@Injectable({
  providedIn: 'root'
})
export class SrvStaticTextService extends SrvSadmapService {
  private _notice: string = '';
  private _disclaimer: string = '';
  private _updates: string = '';
  private _references: string = '';

  get notice(): string {
    return this._notice;
  }

  get disclaimer(): string {
    return this._disclaimer
  }

  get updates(): string {
    return this._updates;
  }

  get references(): string {
    return this._references;
  }

  constructor(
  ) {
    super();

    this.loadSadMap()
      .then((response: SadMap) => {
        this._notice = response.notice;
        this._disclaimer = response.disclaimer;
        this._updates = response.updates;
        this._references = response.references;
      });
  }
}
