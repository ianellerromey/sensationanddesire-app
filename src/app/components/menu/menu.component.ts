import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export enum MenuOptionType {
  ViewTextGlobal,
  ViewTextLocal,
  NavigateInternal,
  NavigateExternal,
  Toggle
};

type MenuOption = {
  type: MenuOptionType;
  text: string;
  handler: (value?: any) => void;
};

export type MenuOptionViewTextGlobal = MenuOption & {
  type: MenuOptionType.ViewTextGlobal;
}

export type MenuOptionViewTextLocal = MenuOption & {
  type: MenuOptionType.ViewTextLocal;
}

export type MenuOptionNavigateInternal = MenuOption & {
  type: MenuOptionType.NavigateInternal;
}

export type MenuOptionNavigateExternal = MenuOption & {
  type: MenuOptionType.NavigateExternal;
}

export type MenuOptionToggle = MenuOption & {
  type: MenuOptionType.Toggle;
  onOrOff: () => boolean;
}

export type AnyMenuOption =
  MenuOptionViewTextGlobal |
  MenuOptionViewTextLocal |
  MenuOptionNavigateInternal |
  MenuOptionNavigateExternal |
  MenuOptionToggle;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private _menuOptionsSorted: AnyMenuOption[] = [];

  get MenuOptionTypeViewTextGlobal(): number {
    return MenuOptionType.ViewTextGlobal;
  }

  get MenuOptionTypeViewTextLocal(): number {
    return MenuOptionType.ViewTextLocal;
  }

  get MenuOptionTypeNavigateInternal(): number {
    return MenuOptionType.NavigateInternal;
  }

  get MenuOptionTypeNavigateExternal(): number {
    return MenuOptionType.NavigateExternal;
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
      if(x.type === MenuOptionType.NavigateInternal ||
        x.type === MenuOptionType.NavigateExternal) {
        return {
          ...x,
          handler: (value: any) => {
            x.handler(value);
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

  checkOnOrOff(menuOption: AnyMenuOption): boolean {
    return (menuOption as MenuOptionToggle).onOrOff();
  }
}
