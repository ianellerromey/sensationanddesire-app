import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SensationAndDesireBlogComponent } from '../sensation-and-desire-blog/sensation-and-desire-blog.component';
import { SadDialogData, SensationAndDesireDialogComponent } from '../sensation-and-desire-dialog/sensation-and-desire-dialog.component';
import { SensationAndDesireService } from '../../services/sensation-and-desire.service';
import { SadInputDialogData, SensationAndDesireInputDialogComponent } from '../sensation-and-desire-input-dialog/sensation-and-desire-input-dialog.component';

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
        } as SadDialogData
      }
    );
  }

  openDisclaimerDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.disclaimer
        } as SadDialogData
      }
    );
  }

  openUpdatesDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.updates
        } as SadDialogData
      }
    );
  }

  openReferencesDialog(): void {
    this._dialog.open(
      SensationAndDesireDialogComponent,
      {
        data: {
          text: this._sadService.references
        } as SadDialogData
      }
    );
  }

  openBlogDialog(): void {
    this._dialog.open(
      SensationAndDesireBlogComponent
    );
  }

  openDraftsDialog(): void {
    this._dialog.open(
      SensationAndDesireInputDialogComponent,
      {
        data: {
          placeholder: "what is the password?"
        } as SadInputDialogData
      }
    ).afterClosed().subscribe((password: string) => {
      this._dialog.open(
        SensationAndDesireDialogComponent,
        {
          data: {
            text: this._sadService.validatePassword(password)
              ? "excellent!"
              : "bogus"
          } as SadDialogData
        }
      );
    });
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
