import { Injectable } from '@angular/core';
import { SrvConfig, SrvConfigService } from './srv-config.service';
import { PagedEntry } from './srv-paged.service';

export type SadMapPagedEntry = {
  title: string;
  id: number;
  location: string;
};

export type SadMap = {
  notice: string;
  disclaimer: string;
  acknowledgements: string;
  mtcbrrAbout: string;
  mtcbrrUpdates: string;
  mtcbrrReferences: string;
  linkInstagram: string;
  linkPatreon: string;
  lovs: PagedEntry[];
  mtcbrrs: PagedEntry[];
  drafts: PagedEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class SrvSadmapService {
  constructor(
    protected _configService: SrvConfigService
  ) { }

  protected loadSadMap(): Promise<SadMap | null> {
    return new Promise(resolve => {
      this._configService.loaded.subscribe((config: SrvConfig | null) => {
        if(!config) {
          resolve(null);
        } 

        fetch(`../../../assets/${config?.sadMapFile}`)
          .then((response: Response) => response.json())
          .then(resolve);
      });
    });
  }
}
