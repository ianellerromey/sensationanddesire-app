import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { DialogInputComponent, DialogInputData } from '../../dialog-input/dialog-input.component';
import { DialogTextComponent, DialogTextData } from '../../dialog-text/dialog-text.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';

export class MenuedComponent {
  protected get noticeDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewText,
      text: 'notice',
      handler: this.getNoticeDialogHandler()
    };
  }

  protected get disclaimerDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewText,
      text: 'disclaimer',
      handler: this.getDisclaimerDialogHandler()
    };
  }

  protected get acknowledgementsDialogMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.ViewText,
      text: 'acknowledgements',
      handler: this.getAcknowledgementsDialogHandler()
    };
  }

  protected get mtcbrrLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.Navigate,
      text: 'Moontide Crossbridge Revelry',
      handler: this.getMtcbrrLinkHandler()
    };
  }

  protected get lovLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.Navigate,
      text: 'Logs of Vates',
      handler: this.getLovLinkHandler()
    };
  }

  protected get instagramLinkMenuOption(): AnyMenuOption {
    return {
      type: MenuOptionType.Navigate,
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

  getMtcbrrLinkHandler(): () => void {
    return () => {
      this._router.navigate([`/mtcbrr/0`]);
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
