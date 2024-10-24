import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { Lov, SrvLovService } from '../../../services/srv-lov.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { LovPagedComponent } from './lov-paged/lov-paged.component';

@Component({
  selector: 'app-lov',
  standalone: true,
  imports: [HeaderComponent, LovPagedComponent],
  templateUrl: './lov.component.html',
  styleUrl: './lov.component.scss'
})
export class LovComponent extends MenuedComponent {
  get node(): { previous: PagedEntryOrNull; next: PagedEntryOrNull; entry: Lov; } | null {
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
        this.mtcbrrLinkMenuOption,
        this.patreonLink,
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
    private _mtcbrrService: SrvLovService
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
