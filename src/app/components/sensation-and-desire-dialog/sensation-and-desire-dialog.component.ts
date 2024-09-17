import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type SadDialogInput = {
  text: string;
};

@Component({
  selector: 'app-sensation-and-desire-dialog',
  templateUrl: './sensation-and-desire-dialog.component.html',
  styleUrls: ['./sensation-and-desire-dialog.component.scss']
})
export class SensationAndDesireDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<SensationAndDesireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SadDialogInput) { }

  ngOnInit(): void {
  }

  okClose(): void {
    this._dialogRef.close(true);
  }

}
