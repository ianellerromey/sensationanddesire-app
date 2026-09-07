import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { SadMap, SrvSadmapService } from './srv-sadmap.service';

@Injectable({
  providedIn: 'root'
})
export class SrvExternalLinkService extends SrvSadmapService {
  private _linkInstagram: string = '';

  get linkInstagram(): string {
    return this._linkInstagram;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);

    this.loadSadMap()
      .then((sadMap: SadMap | null) => {
        if(!sadMap) {
          return;
        }

        this._linkInstagram = sadMap.linkInstagram;
      });
  }
}
