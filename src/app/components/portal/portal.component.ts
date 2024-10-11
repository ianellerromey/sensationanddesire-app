import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvStaticTextService } from '../../services/srv-statictext.service';
import { DialogTextComponent, DialogTextData } from '../dialog-text/dialog-text.component';
import { HeaderComponent } from '../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../menu/menu.component';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent {
  get menuOptions(): AnyMenuOption[] {
    const mo: AnyMenuOption[] = this._staticTextService.notice
      ? [
        {
          type: MenuOptionType.ViewText,
          text: 'notice',
          handler: this.getNoticeDialogHandler()
        }
      ]
      : [];
    
      return [
        ...mo,
        {
          type: MenuOptionType.ViewText,
          text: 'disclaimer',
          handler: this.getDisclaimerDialogHandler()
        },
        {
          type: MenuOptionType.Navigate,
          text: 'Moontide Crossbridge Revelry',
          handler: this.getMtcbrrLinkHandler()
        },
        {
          type: MenuOptionType.Navigate,
          text: 'Logs of Vates',
          handler: this.getLovLinkHandler()
        },
        {
          type: MenuOptionType.Navigate,
          text: 'instagram',
          handler: this.getInstagramLinkHandler()
        },
        {
          type: MenuOptionType.Toggle,
          text: 'audio',
          onOrOff: () => false,
          handler: this.getAudioToggleHandler()
        },
      ]
  }

  constructor(
    private _router: Router,
    private _staticTextService: SrvStaticTextService,
    private _dialog: MatDialog
  ) {
  }
  
  getNoticeDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.notice);
    };
  }

  getDisclaimerDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.disclaimer);
    };
  }

  getMtcbrrLinkHandler(): () => void {
    return () => {
      this.handleMtcbrrLink();
    };
  }

  getLovLinkHandler(): () => void {
    return () => {
      this.handleLovLink();
    };
  }

  getInstagramLinkHandler(): () => void {
    return () => {
      window.open('https://www.instagram.com/sensationanddesire', '_blank');
    };
  }

  getAudioToggleHandler(): () => void {
    return () => {
    };
  }

  private openDialogText(text: string) {
    const data: DialogTextData = {
      text
    };

    this._dialog.open(
      DialogTextComponent,
      {
        data
      }
    );
  }

  handleMtcbrrLink(): void {
    this._router.navigate([`/mtcbrr/0`]);
  }

  handleLovLink(): void {
    this._router.navigate([`/lov/0`]);
  }
}
