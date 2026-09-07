import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

const mtcbrrSadMapEntries = 'mtcbrrs';

export type Mtcbrr = {
  content: string | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvMtcbrrService extends SrvPagedService<Mtcbrr> {
  get mtcbrrs(): Mtcbrr[] {
    return this.entries;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  protected override getSadMapEntriesProperty(): string {
    return mtcbrrSadMapEntries;
  }

  protected override completeEntry(entry: PagedEntry): Promise<Mtcbrr> {
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
