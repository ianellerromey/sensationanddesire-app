import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

export type Short = {
  content: string[] | undefined;
  references: string[] | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvShortsService extends SrvPagedService<Short> {
  get shorts(): Short[] {
    return this.entries;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  protected override getSadMapEntriesProperty(): string {
    return 'shorts';
  }

  protected override completeEntry(entry: PagedEntry): Promise<Short> {
    return new Promise(resolve => {
      const locationSplit = entry.location.split(';').map(x => `../../../assets/${x}`);
      const content = locationSplit.filter((x: string) => x.endsWith('.short'));

      const contentFetched = new Array(content.length);
      var fetchAllContent = Promise.all(content.map((x, index) => {
        return fetch(x).then((response: Response) => response.text()).then((y: string) => contentFetched[index] = y);
      }));

      fetchAllContent.then(() => {
        resolve({
          ...entry,
          content: contentFetched,
          references: []
        });
      });
    });
  }
}
