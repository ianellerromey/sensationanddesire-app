import { Injectable } from '@angular/core';
import { SrvConfigService } from './srv-config.service';
import { PagedEntry, SrvPagedService } from './srv-paged.service';
import { SadMap } from './srv-sadmap.service';

const mtcbrrSadMapEntries = 'mtcbrrs';
const draftsSadMapEntries = 'drafts';

export type Mtcbrr = {
  content: string | undefined;
} & PagedEntry;

@Injectable({
  providedIn: 'root'
})
export class SrvMtcbrrService extends SrvPagedService<Mtcbrr> {
  private _draftsUnlocked: boolean = false;

  get mtcbrrs(): Mtcbrr[] {
    return this.entries;
  }

  get draftsUnlocked(): boolean {
    return this._draftsUnlocked;
  }

  set draftsUnlocked(value: boolean) {
    if(this._draftsUnlocked !== value) {
      this._draftsUnlocked = value;
      this.updateWithDraftsUnlocked();
    }
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

  private updateWithDraftsUnlocked(): void {
    this.loadSadMap()
      .then((sadMap: SadMap | null) => {
        if(!sadMap) {
          return;
        }

        const newEntries: Mtcbrr[] = (this.draftsUnlocked)
          ? [
            ...sadMap[mtcbrrSadMapEntries] as Mtcbrr[],
            ...sadMap[draftsSadMapEntries] as Mtcbrr[]
          ]
          : [...sadMap[mtcbrrSadMapEntries] as Mtcbrr[]];

        if(this._currentEntryId !== null && this._currentEntryId >= newEntries.length) {
          this._currentEntryId = newEntries.length - 1;
        }

        this.setEntriesAndUpdateNode(newEntries);
      });
  }
}
