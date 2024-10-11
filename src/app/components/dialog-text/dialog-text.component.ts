import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export type DialogTextData = {
  text: string;
};

@Component({
  selector: 'app-text-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-text.component.html',
  styleUrl: './dialog-text.component.scss'
})
export class DialogTextComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTextData) { }

  ngOnInit(): void {
  }

  okClose(): void {
    this._dialogRef.close(true);
  }
}
