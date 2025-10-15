import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

export type Lov = {
  content: string[] | undefined;
  references: string[] | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvLovService extends SrvPagedService<Lov> {
  get lovs(): Lov[] {
    return this.entries;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  protected override getSadMapEntriesProperty(): string {
    return 'lovs';
  }

  protected override completeEntry(entry: PagedEntry): Promise<Lov> {
    return new Promise(resolve => {
      const locationSplit = entry.location.split(';').map(x => `../../../assets/${x}`);
      const content = locationSplit.filter((x: string) => x.endsWith('.lov'));
      const references = locationSplit.filter((x: string) => x.endsWith('.txt'));

      const contentFetched = new Array(content.length);
      var fetchAllContent = Promise.all(content.map((x, index) => {
        return fetch(x).then((response: Response) => response.text()).then((y: string) => contentFetched[index] = y);
      }));

      if(references.length == 1) {
        fetch(references[0])
          .then((response: Response) => response.text())
          .then((x: string) => {
            fetchAllContent.then(() => {
              resolve({
                ...entry,
                content: contentFetched,
                references: x.split('\r\n')
              });
            });
          });
      }
      else {
        fetchAllContent.then(() => {
          resolve({
            ...entry,
            content: contentFetched,
            references: []
          });
        });
      }
    });
  }
}
