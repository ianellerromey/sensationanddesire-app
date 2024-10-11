import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Mtcbrr, SrvMtcbrrService } from '../../../services/srv-mtcbrr.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { DialogTextComponent, DialogTextData } from '../../dialog-text/dialog-text.component';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { MtcbrrPagedComponent } from './mtcbrr-paged/mtcbrr-paged.component';

@Component({
  selector: 'app-mtcbrr',
  standalone: true,
  imports: [HeaderComponent, MtcbrrPagedComponent],
  providers: [],
  templateUrl: './mtcbrr.component.html',
  styleUrl: './mtcbrr.component.scss'
})
export class MtcbrrComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Mtcbrr; } | null {
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
          type: MenuOptionType.ViewText,
          text: 'updates',
          handler: this.getUpdatesDialogHandler()
        },
        {
          type: MenuOptionType.ViewText,
          text: 'references',
          handler: this.getReferencesDialogHandler()
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
          text: 'drafts',
          onOrOff: () => false,
          handler: this.getDraftsToggleHandler()
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
    private _mtcbrrService: SrvMtcbrrService,
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

  getUpdatesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.updates);
    };
  }

  getReferencesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.references);
    };
  }

  getLovLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/lov/0`]);
    };
  }

  getInstagramLinkHandler(): () => void {
    return () => {
      window.open('https://www.instagram.com/sensationanddesire', '_blank');
    };
  }

  getDraftsToggleHandler(): () => void {
    return () => {
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
