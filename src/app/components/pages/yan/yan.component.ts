import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { SrvYanService, Yan } from '../../../services/srv-yan.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { YanPagedComponent } from './yan-paged/yan-paged.component';

@Component({
  selector: 'app-yan',
  standalone: true,
  imports: [HeaderComponent, YanPagedComponent],
  providers: [],
  templateUrl: './yan.component.html',
  styleUrl: './yan.component.scss'
})
export class YanComponent extends MenuedComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Yan; } | null {
    return this._yanService.node;
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
          text: 'about yan',
          handler: this.getYanAboutDialogHandler()
        },
        {
          type: MenuOptionType.ViewTextLocal,
          text: 'yan updates',
          handler: this.getYanUpdatesDialogHandler()
        },
        this.lilacLinkMenuOption,
        this.mtcbrrLinkMenuOption,
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
    private _yanService: SrvYanService
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );
  }

  getYanAboutDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.yanAbout);
    };
  }

  getYanUpdatesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.yanUpdates);
    };
  }
}
