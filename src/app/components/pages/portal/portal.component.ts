import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent extends MenuedComponent {
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
        this.lilacLinkMenuOption,
        this.mtcbrrLinkMenuOption,
        this.yanLinkMenuOption,
        this.shortsLinkMenuOption,
        this.instagramLinkMenuOption,
        this.audioToggleMenuOption
      ]
  }

  constructor(
    _router: Router,
    _audioService: SrvAudioService,
    _staticTextService: SrvStaticTextService,
    _externalLinkService: SrvExternalLinkService,
    _dialog: MatDialog,
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );
  }

  handleLilacLink(): void {
    this._router.navigate([`/lilac/0`]);
  }

  handleMtcbrrLink(): void {
    this._router.navigate([`/mtcbrr/0`]);
  }

  handleYanLink(): void {
    this._router.navigate([`/yan/0`]);
  }

  handleShortsLink(): void {
    this._router.navigate([`/shorts/0`]);
  }
}
