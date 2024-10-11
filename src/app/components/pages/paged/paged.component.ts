import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PagedEntry, PagedEntryOrNull, SrvPagedService } from '../../../services/srv-paged.service';

@Component({
  selector: 'app-paged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paged.component.html',
  styleUrl: './paged.component.scss'
})
export class PagedComponent<T extends PagedEntry> {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: T; } | null {
    return this._pagedService.node;
  }

  get entries(): T[] {
    return this._pagedService.entries;
  }

  get first(): PagedEntry {
    return this.entries[0];
  }

  get last(): PagedEntry {
    return this.entries[this.entries.length - 1];
  }

  @Input() set entryId(value: number) {
    this._pagedService.updateNode(value);
  }

  constructor(
    protected _pagedService: SrvPagedService<T>
  ) { }

  updateNode(newCurrentEntryId: number | null): void {
    newCurrentEntryId !== null && this.navigateToEntry(newCurrentEntryId);
  }

  disableScrolling(): boolean {
    if(!this.node) {
      return true;
    }

    return this.disableScrollingCheck();
  }

  protected disableScrollingCheck(): boolean {
    return false;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  scrollToBottom(): void {
    window.scrollTo(0, window.document.body.scrollHeight);
  }

  protected navigateToEntry(entryId: number): void
  {
  }
}
