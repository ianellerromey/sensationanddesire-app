import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SadMap, SrvSadmapService } from './srv-sadmap.service';

export type PagedEntry = {
  id: number;
  title: string;
  location: string;
};

export type PagedEntryOrNull = PagedEntry | null;

@Injectable({
  providedIn: 'root'
})
export class SrvPagedService<T extends PagedEntry> extends SrvSadmapService {
  protected _currentEntryId: number | null = null;
  protected _entries: T[] = [];
  protected _node: { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; } | null = null;
  protected _nodeStream: Subject<{ previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; } | null> = new Subject<{ previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; } | null>();

  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; } | null {
    return this._node;
  }

  get entries(): T[] {
    return this._entries;
  }

  nodeStream = this._nodeStream.asObservable();

  constructor(
  ) {
    super();

    this.loadSadMap()
      .then((response: SadMap) => {
        this._entries = (response as any)[this.getSadMapEntriesProperty()];
        this._currentEntryId && this.updateNode(this._currentEntryId);
      });      
  }

  updateNode(newCurrentEntryId: number): void {
    this._currentEntryId = newCurrentEntryId;

    if(!this.entries.length) {
      return;
    }

    const newCurrentEntry = this._entries[this._currentEntryId];
    this.getNewNode(newCurrentEntry)
      .subscribe((node: { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; }) => {
          this._node = node;
          this._nodeStream.next(this._node);
        });
  }

  protected getNewNode(newCurrentEntry: T): Observable<{ previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; }> {
    const entrySubject = new Subject<{ previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; }>();

    this.completeEntry(newCurrentEntry)
      .then((completedEntry: T) => {
          entrySubject.next({
            entry: completedEntry,
            previous: ((newCurrentEntry.id - 1 >= 0) && this._entries[newCurrentEntry.id - 1]) || null,
            next: ((newCurrentEntry.id + 1 < this._entries.length) && this._entries[newCurrentEntry.id + 1]) || null
          });
        });

    return entrySubject;
  }

  protected getSadMapEntriesProperty(): string {
    return '';
  }

  protected completeEntry(entry: PagedEntry): Promise<T> {
    return Promise.resolve({} as T); 
  }
}
