import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SensationAndDesireService } from '../../services/sensation-and-desire.service';

@Component({
  selector: 'app-sensation-and-desire-blog',
  templateUrl: './sensation-and-desire-blog.component.html',
  styleUrls: ['./sensation-and-desire-blog.component.scss']
})
export class SensationAndDesireBlogComponent implements OnInit {
  private _blogEntryIds: number[] = [];
  private _currentBlogEntryIndex: number = 0;
  private _currentBlogEntryPageIndex: number = 0;

  get blogEntryIds(): number[] {
    return this._blogEntryIds;
  }

  get currentBlogEntryIndex(): number {
    return this._currentBlogEntryIndex;
  }

  get currentBlogEntryId(): number {
    return this.getBlogEntryId(this._currentBlogEntryIndex);
  }

  get currentBlogEntryPages(): string[] {
    return this._sadService.blogs[this.getBlogEntryId(this._currentBlogEntryIndex)];
  }

  get currentBlogEntryPageIndex(): number {
    return this._currentBlogEntryPageIndex;
  }

  get currentBlogEntryPageAsset(): string {
    return `../../../assets/sad-blog/${this._sadService.blogs[this.currentBlogEntryId][this.currentBlogEntryPageIndex]}`;
  }

  constructor(
    private _dialogRef: MatDialogRef<SensationAndDesireBlogComponent>,
    private _sadService: SensationAndDesireService
  ) { }

  ngOnInit(): void {
    const blogs = this._sadService.blogs;
    this._blogEntryIds = Object.keys(blogs).map(i => +i).sort((a, b) => b - a);
    this.updateCurrentBlogEntryIndex(0);
  }

  okClose(): void {
    this._dialogRef.close();
  }

  getBlogEntryId(index: number): number {
    return this._blogEntryIds[index];
  }

  updateCurrentBlogEntryIndex(index: number): void {
    this._currentBlogEntryIndex = index;
    this._currentBlogEntryPageIndex = 0;
  }

  updateCurrentBlogEntryPageIndex(index: number): void {
    if(index < 0 || index >= this.currentBlogEntryPages.length) {
      return;
    }
    
    this._currentBlogEntryPageIndex = index;
  }

  blogEntryIdToDate(id: number): string {
    return id
      ? new Date(id).toDateString()
      : '';
  }

}
