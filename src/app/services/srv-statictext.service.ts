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
  private _references: string = '';
  private _yanAbout: string = '';
  private _yanUpdates: string = '';
  private _mtcbrrAbout: string = '';
  private _mtcbrrUpdates: string = '';
  private _lilacAbout: string = '';
  private _lilacUpdates: string = '';

  get notice(): string {
    return this._notice;
  }

  get disclaimer(): string {
    return this._disclaimer
  }

  get acknowledgements(): string {
    return this._acknowledgements;
  }

  get references(): string {
    return this._references;
  }

  get yanAbout(): string {
    return this._yanAbout;
  }

  get yanUpdates(): string {
    return this._yanUpdates;
  }

  get mtcbrrAbout(): string {
    return this._mtcbrrAbout;
  }

  get mtcbrrUpdates(): string {
    return this._mtcbrrUpdates;
  }

  get lilacAbout(): string {
    return this._lilacAbout;
  }

  get lilacUpdates(): string {
    return this._lilacUpdates;
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
          references,
          yanAbout,
          yanUpdates,
          mtcbrrAbout,
          mtcbrrUpdates,
          lilacAbout,
          lilacUpdates
        } = sadMap;

        this._notice = notice;
        this._disclaimer = disclaimer;
        this._acknowledgements = acknowledgements;
        this._references = references;
        this._yanAbout = yanAbout;
        this._yanUpdates = yanUpdates;
        this._mtcbrrAbout = mtcbrrAbout;
        this._mtcbrrUpdates = mtcbrrUpdates;
        this._lilacAbout = lilacAbout;
        this._lilacUpdates = lilacUpdates;
      });
  }
}
