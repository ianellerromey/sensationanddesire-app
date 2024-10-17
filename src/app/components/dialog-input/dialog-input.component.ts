import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export type DialogInputData = {
  text: string | undefined;
  placeholder: string | undefined;
};

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './dialog-input.component.html',
  styleUrl: './dialog-input.component.scss'
})
export class DialogInputComponent {
  inputValue: string = '';

  constructor(
    private _dialogRef: MatDialogRef<DialogInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInputData) { }

  ngOnInit(): void {
  }
}
