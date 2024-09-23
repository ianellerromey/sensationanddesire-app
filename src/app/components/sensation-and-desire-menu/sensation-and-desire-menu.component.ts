import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SensationAndDesireBlogComponent } from '../sensation-and-desire-blog/sensation-and-desire-blog.component';
import { SadDialogInput, SensationAndDesireDialogComponent } from '../sensation-and-desire-dialog/sensation-and-desire-dialog.component';
import { SensationAndDesireService } from '../../services/sensation-and-desire.service';

@Component({
  selector: 'app-sensation-and-desire-menu',
  templateUrl: './sensation-and-desire-menu.component.html',
  styleUrls: ['./sensation-and-desire-menu.component.scss']
})
export class SensationAndDesireMenuComponent implements OnInit {

  get audioAudible(): boolean {
    return this._sadService.audible;
  }

  get hasNotice(): boolean {
    return !!this._sadService.notice;
  }

  constructor(
    private _dialogRef: MatDialogRef<SensationAndDesireMenuComponent>,
    private _sadService: SensationAndDesireService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openNoticeDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.notice
        } as SadDialogInput
      }
    );
  }

  openDisclaimerDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.disclaimer
        } as SadDialogInput
      }
    );
  }

  openUpdatesDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.updates
        } as SadDialogInput
      }
    );
  }

  openReferencesDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.references
        } as SadDialogInput
      }
    );
  }

  openBlogDialog(): void {
    this._dialog.open(
      SensationAndDesireBlogComponent
    );
  }

  openInstagramLink(): void {
    window.open('https://www.instagram.com/sensationanddesire', '_blank');
  }

  toggleAudio(): void {
    this._sadService.toggleAudio();
  }

  okClose(): void {
    this._dialogRef.close(true);
  }

}
