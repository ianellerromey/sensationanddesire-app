import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
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
    _configService: SrvConfigService
  ) {
    super(_configService);

    this.loadSadMap()
      .then((sadMap: SadMap | null) => {
        if(!sadMap) {
          return;
        }
        
        const {
          notice,
          disclaimer,
          acknowledgements,
          mtcbrrAbout,
          mtcbrrUpdates,
          mtcbrrReferences
        } = sadMap;

        this._notice = notice;
        this._disclaimer = disclaimer;
        this._acknowledgements = acknowledgements;
        this._mtcbrrAbout = mtcbrrAbout;
        this._mtcbrrUpdates = mtcbrrUpdates;
        this._mtcbrrReferences = mtcbrrReferences;
      });
  }
}
