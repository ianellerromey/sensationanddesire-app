import { Injectable } from '@angular/core';
import { SadMap, SrvSadmapService } from './srv-sadmap.service';

@Injectable({
  providedIn: 'root'
})
export class SrvExternalLinkService extends SrvSadmapService {
  private _linkInstagram: string = '';
  private _linkPatreon: string = '';

  get linkInstagram(): string {
    return this._linkInstagram;
  }

  get linkPatreon(): string {
    return this._linkPatreon
  }

  constructor(
  ) {
    super();

    this.loadSadMap()
      .then((response: SadMap) => {
        this._linkInstagram = response.linkInstagram;
        this._linkPatreon = response.linkPatreon;
      });
  }
}
