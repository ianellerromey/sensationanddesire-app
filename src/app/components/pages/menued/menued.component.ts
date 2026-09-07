import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { DialogInputComponent, DialogInputData } from '../../dialog-input/dialog-input.component';
import { DialogTextComponent, DialogTextData } from '../../dialog-text/dialog-text.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';

export class MenuedComponent {
  protected get noticeDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewTextGlobal,
      text: 'notice',
      handler: this.getNoticeDialogHandler()
    };
  }

  protected get disclaimerDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewTextGlobal,
      text: 'disclaimer',
      handler: this.getDisclaimerDialogHandler()
    };
  }

  protected get acknowledgementsDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewTextGlobal,
      text: 'acknowledgements',
      handler: this.getAcknowledgementsDialogHandler()
    };
  }

  protected get referencesDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewTextGlobal,
      text: 'references',
      handler: this.getReferencesDialogHandler()
    };
  }

  protected get lilacLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.NavigateInternal,
      text: '2026 - lilac, "love is like a curse"',
      handler: this.getLilacLinkHandler()
    };
  }

  protected get mtcbrrLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.NavigateInternal,
      text: '2023 - MOONTIDE CROSSBRIDGE REVELRY',
      handler: this.getMtcbrrLinkHandler()
    };
  }

  protected get yanLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.NavigateInternal,
      text: '2017 - Youth at Night',
      handler: this.getYanLinkHandler()
    };
  }

  protected get shortsLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.NavigateInternal,
      text: 'Shorts',
      handler: this.getShortsLinkHandler()
    };
  }

  protected get instagramLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.NavigateExternal,
      text: 'instagram',
      handler: this.getInstagramLinkHandler()
    };
  }

  protected get audioToggleMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.Toggle,
      text: 'audio',
      onOrOff: this.getAudioOnOrOffHandler(),
      handler: this.getAudioToggleHandler()
    };
  }

  constructor(
    protected _router: Router,
    protected _staticTextService: SrvStaticTextService,
    protected _externalLinkService: SrvExternalLinkService,
    protected _audioService: SrvAudioService,
    protected _dialog: MatDialog
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

  getAcknowledgementsDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.acknowledgements);
    };
  }

  getReferencesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.references);
    };
  }

  getLilacLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/lilac/0`]);
    };
  }

  getMtcbrrLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/mtcbrr/0`]);
    };
  }

  getYanLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/yan/0`]);
    };
  }

  getShortsLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/shorts/0`]);
    };
  }

  getInstagramLinkHandler(): () => void {
    return () => {
      window.open(this._externalLinkService.linkInstagram, '_blank');
    };
  }

  getAudioOnOrOffHandler(): () => boolean {
    return () => this._audioService.audioEnabled;
  }

  getAudioToggleHandler(): (value?: any) => void {
    return (value: any) => {
      const { checked }: { checked: boolean } = value;

      this._audioService.audioEnabled = checked;
    };
  }

  protected openDialogText(text: string): void {
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

  protected openDialogInput(text: string, placeholder: string): Observable<string> {
    const inputValueSubject: Subject<string> = new Subject<string>();

    const data: DialogInputData = {
      text,
      placeholder
    };

    this._dialog.open(
      DialogInputComponent,
      {
        data
      }
    ).afterClosed().subscribe((inputValue: string) => inputValueSubject.next(inputValue));

    return inputValueSubject;
  }
}
