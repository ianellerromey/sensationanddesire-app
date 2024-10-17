import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AnyMenuOption, MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() menuOptions: AnyMenuOption[] = [];

  constructor(
    private _dialog: MatDialog
  ) {
  }

  openMenu() {
    this._dialog.open(
      MenuComponent,
      {
        data: this.menuOptions,
        autoFocus: false
      }
    );
  }
}
