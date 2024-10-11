import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export enum MenuOptionType {
  ViewText,
  Navigate,
  Toggle
};

type MenuOption = {
  type: MenuOptionType;
  text: string;
  handler: () => void;
};

export type MenuOptionViewText = MenuOption & {
  type: MenuOptionType.ViewText;
}

export type MenuOptionNavigate = MenuOption & {
  type: MenuOptionType.Navigate;
}

export type MenuOptionToggle = MenuOption & {
  type: MenuOptionType.Toggle;
  onOrOff: () => boolean;
}

export type AnyMenuOption =
  MenuOptionViewText |
  MenuOptionNavigate |
  MenuOptionToggle;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private _menuOptionsSorted: AnyMenuOption[] = [];

  get MenuOptionTypeViewText(): number {
    return MenuOptionType.ViewText;
  }

  get MenuOptionTypeNavigate(): number {
    return MenuOptionType.Navigate;
  }

  get MenuOptionTypeToggle(): number {
    return MenuOptionType.Toggle;
  }

  get menuOptionsSorted(): AnyMenuOption[] {
    return this._menuOptionsSorted;
  }

  constructor(
    private _dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public menuOptions: AnyMenuOption[]
  ) {
    this._menuOptionsSorted = menuOptions.map(x => {
      if(x.type === MenuOptionType.Navigate) {
        return {
          ...x,
          handler: () => {
            x.handler();
            this._dialogRef.close(true);
          }
        }
      }
      else {
        return x;
      }
    });
    this._menuOptionsSorted.sort((a, b) => a.type - b.type);
  }

  ngOnInit(): void {
  }

  checkOnOrOff(menuOption: AnyMenuOption): boolean {
    return (menuOption as MenuOptionToggle).onOrOff();
  }
}
