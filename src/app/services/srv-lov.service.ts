import { Injectable } from '@angular/core';
import { PagedEntry, SrvPagedService } from './srv-paged.service';

export type Lov = {
  content: string[] | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvLovService extends SrvPagedService<Lov> {
  get lovs(): Lov[] {
    return this.entries;
  }

  constructor(
  ) {
    super();
  }

  protected override getSadMapEntriesProperty(): string {
    return 'lovs';
  }

  protected override completeEntry(entry: PagedEntry): Promise<Lov> {
    return Promise.resolve({
      ...entry,
      content: entry.location.split(';').map(x => `../../../assets/${x}`)
    });
  }
}
