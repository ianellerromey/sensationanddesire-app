import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { Lilac, SrvLilacService } from '../../../services/srv-lilac.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { LilacPagedComponent } from './lilac-paged/lilac-paged.component';

@Component({
  selector: 'app-lilac',
  standalone: true,
  imports: [HeaderComponent, LilacPagedComponent],
  providers: [],
  templateUrl: './lilac.component.html',
  styleUrl: './lilac.component.scss'
})
export class LilacComponent extends MenuedComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Lilac; } | null {
    return this._lilacService.node;
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
          type: MenuOptionType.ViewText,
          text: 'about lilac',
          handler: this.getLilacAboutDialogHandler()
        },
        {
          type: MenuOptionType.ViewText,
          text: 'lilac updates',
          handler: this.getLilacUpdatesDialogHandler()
        },
        this.mtcbrrLinkMenuOption,
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
    private _lilacService: SrvLilacService
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );
  }

  getLilacAboutDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.lilacAbout);
    };
  }

  getLilacUpdatesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.lilacUpdates);
    };
  }
}
