import { Injectable } from '@angular/core';
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
  constructor() { }

  protected loadSadMap(): Promise<SadMap> {
    return fetch('../../../assets/sad-map.json')
      .then((response: Response) => response.json());
  }
}
