import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type SadInputDialogData = {
  text: string | null;
  placeholder: string | null;
};

@Component({
  selector: 'app-sensation-and-desire-input-dialog',
  templateUrl: './sensation-and-desire-input-dialog.component.html',
  styleUrls: ['./sensation-and-desire-input-dialog.component.scss']
})
export class SensationAndDesireInputDialogComponent implements OnInit {
  inputValue: string = '';

  constructor(
    private _dialogRef: MatDialogRef<SensationAndDesireInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: SadInputDialogData) { }

  ngOnInit(): void {
  }

  okClose(): void {
    this._dialogRef.close(this.inputValue);
  }

}
