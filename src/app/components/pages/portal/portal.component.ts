import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
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
        this.mtcbrrLinkMenuOption,
        this.lovLinkMenuOption,
        this.instagramLinkMenuOption,
        this.audioToggleMenuOption
      ]
  }

  constructor(
    _router: Router,
    _audioService: SrvAudioService,
    _staticTextService: SrvStaticTextService,
    _dialog: MatDialog,
  ) {
    super(
      _router,
      _staticTextService,
      _audioService,
      _dialog
    );
  }

  handleMtcbrrLink(): void {
    this._router.navigate([`/mtcbrr/0`]);
  }

  handleLovLink(): void {
    this._router.navigate([`/lov/0`]);
  }
}
