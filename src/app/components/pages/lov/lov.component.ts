import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lov, SrvLovService } from '../../../services/srv-lov.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { DialogTextComponent, DialogTextData } from '../../dialog-text/dialog-text.component';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { LovPagedComponent } from './lov-paged/lov-paged.component';

@Component({
  selector: 'app-lov',
  standalone: true,
  imports: [HeaderComponent, LovPagedComponent],
  templateUrl: './lov.component.html',
  styleUrl: './lov.component.scss'
})
export class LovComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Lov; } | null {
    return this._mtcbrrService.node;
  }

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

  @Input() entryId: number = 0;

  constructor(
    private _router: Router,
    private _mtcbrrService: SrvLovService,
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
      this._router.navigate([`/mtcbrr/0`]);
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
}
