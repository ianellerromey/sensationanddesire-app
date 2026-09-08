import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { Short, SrvShortsService } from '../../../services/srv-shorts.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { ShortsPagedComponent } from './shorts-paged/shorts-paged.component';

@Component({
  selector: 'app-shorts',
  standalone: true,
  imports: [HeaderComponent, ShortsPagedComponent],
  templateUrl: './shorts.component.html',
  styleUrl: './shorts.component.scss'
})
export class ShortsComponent extends MenuedComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Short; } | null {
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
        this.homeLinkMenuOption,
        this.lilacLinkMenuOption,
        this.mtcbrrLinkMenuOption,
        this.yanLinkMenuOption,
        this.instagramLinkMenuOption,
        this.audioToggleMenuOption
      ]
  }

  @Input() entryId: number = 0;

  constructor(
    _router: Router,
    _audioService: SrvAudioService,
    _staticTextService: SrvStaticTextService,
    _externalLinkService: SrvExternalLinkService,
    _dialog: MatDialog,
    private _mtcbrrService: SrvShortsService
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );
  }
}
