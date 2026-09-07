import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

const yanSadMapEntries = 'yans';

export type Yan = {
  content: string | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvYanService extends SrvPagedService<Yan> {
  get yans(): Yan[] {
    return this.entries;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  protected override getSadMapEntriesProperty(): string {
    return yanSadMapEntries;
  }

  protected override completeEntry(entry: PagedEntry): Promise<Yan> {
    return fetch(`../../../assets/${entry.location}`)
      .then((response: Response) => response.text())
      .then((x: string) => {
        return {
          ...entry,
          content: x
        };
      });
  }
}
