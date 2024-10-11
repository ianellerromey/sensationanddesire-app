import { Injectable } from '@angular/core';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

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
  ) {
    super();
  }

  protected override getSadMapEntriesProperty(): string {
    return 'mtcbrrs';
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
