import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { Mtcbrr, SrvMtcbrrService } from '../../../services/srv-mtcbrr.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { MtcbrrPagedComponent } from './mtcbrr-paged/mtcbrr-paged.component';

@Component({
  selector: 'app-mtcbrr',
  standalone: true,
  imports: [HeaderComponent, MtcbrrPagedComponent],
  providers: [],
  templateUrl: './mtcbrr.component.html',
  styleUrl: './mtcbrr.component.scss'
})
export class MtcbrrComponent extends MenuedComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Mtcbrr; } | null {
    return this._mtcbrrService.node;
  }

  get menuOptions(): AnyMenuOption[] {
    const mo: AnyMenuOption[] = this._staticTextService.notice
      ? [
        this.noticeDialogMenuOption
      ]
      : [];
    
      return [
        ...mo,
        this.disclaimerDialogMenuOption,
        this.acknowledgementsDialogMenuOption,
        this.referencesDialogMenuOption,
        {
          type: MenuOptionType.ViewTextLocal,
          text: 'about mtcbrr',
          handler: this.getMtcbrrAboutDialogHandler()
        },
        {
          type: MenuOptionType.ViewTextLocal,
          text: 'mtcbrr updates',
          handler: this.getMtcbrrUpdatesDialogHandler()
        },
        this.lilacLinkMenuOption,
        this.yanLinkMenuOption,
        this.instagramLinkMenuOption,
        this.audioToggleMenuOption,
      ]
  }

  @Input() entryId: number = 0;

  constructor(
    _router: Router,
    _audioService: SrvAudioService,
    _staticTextService: SrvStaticTextService,
    _externalLinkService: SrvExternalLinkService,
    _dialog: MatDialog,
    private _mtcbrrService: SrvMtcbrrService
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );
  }

  getMtcbrrAboutDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.mtcbrrAbout);
    };
  }

  getMtcbrrUpdatesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.mtcbrrUpdates);
    };
  }
}
