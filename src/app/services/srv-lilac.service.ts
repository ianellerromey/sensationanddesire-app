import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

const lilacSadMapEntries = 'lilacs';

export type Lilac = {
  content: string | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvLilacService extends SrvPagedService<Lilac> {
  get lilacs(): Lilac[] {
    return this.entries;
  }

  constructor(
    _configService: SrvConfigService
  ) {
    super(_configService);
  }

  protected override getSadMapEntriesProperty(): string {
    return lilacSadMapEntries;
  }

  protected override completeEntry(entry: PagedEntry): Promise<Lilac> {
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
