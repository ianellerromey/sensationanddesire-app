import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SrvAudioService } from '../../../services/srv-audio.service';
import { SrvConfigService } from '../../../services/srv-config.service';
import { SrvExternalLinkService } from '../../../services/srv-externallink.service';
import { Mtcbrr, SrvMtcbrrService } from '../../../services/srv-mtcbrr.service';
import { PagedEntryOrNull } from '../../../services/srv-paged.service';
import { SrvStaticTextService } from '../../../services/srv-statictext.service';
import { HeaderComponent } from '../../header/header.component';
import { AnyMenuOption, MenuOptionType } from '../../menu/menu.component';
import { MenuedComponent } from '../menued/menued.component';
import { MtcbrrPagedComponent } from './mtcbrr-paged/mtcbrr-paged.component';

async function encryptNewPassword(password: string): Promise<{
  iv: number[],
  key: number[],
  passwordEncrypted: string
}> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const key = window.crypto.getRandomValues(new Uint8Array(16));
  const keyEncoded = await window.crypto.subtle.importKey(
    "raw",
    key.buffer,
    "AES-CTR",
    false,
    ["encrypt", "decrypt"],
  );
  const passwordBuffer = (new TextEncoder()).encode(password);
  const passwordEncrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: iv,
      length: 128,
    },
    keyEncoded,
    passwordBuffer
  );
  const decoder = new TextDecoder('utf-8');

  return {
    iv: [...iv],
    key: [...key],
    passwordEncrypted: decoder.decode(passwordEncrypted)
  };
};

async function encryptInputPassword(
  iv: number[],
  key: number[],
  password: string
): Promise<string> {
  const keyEncoded = await window.crypto.subtle.importKey(
    "raw",
    (new Uint8Array(key)).buffer,
    "AES-CTR",
    false,
    ["encrypt", "decrypt"],
  );
  const passwordBuffer = (new TextEncoder()).encode(password);
  const passwordEncrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: (new Uint8Array(iv)).buffer,
      length: 128,
    },
    keyEncoded,
    passwordBuffer
  );
  const decoder = new TextDecoder('utf-8');

  return decoder.decode(passwordEncrypted);
}

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
        {
          type: MenuOptionType.ViewText,
          text: 'about',
          handler: this.getMtcbrrAboutDialogHandler()
        },
        {
          type: MenuOptionType.ViewText,
          text: 'updates',
          handler: this.getMtcbrrUpdatesDialogHandler()
        },
        {
          type: MenuOptionType.ViewText,
          text: 'references',
          handler: this.getMtcbrrReferencesDialogHandler()
        },
        this.lovLinkMenuOption,
        this.patreonLink,
        this.instagramLinkMenuOption,
        {
          type: MenuOptionType.Toggle,
          text: 'drafts',
          onOrOff: this.getDraftsOnOrOffHandler(),
          handler: this.getDraftsToggleHandler()
        },
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
    private _mtcbrrService: SrvMtcbrrService,
    private _configService: SrvConfigService
  ) {
    super(
      _router,
      _staticTextService,
      _externalLinkService,
      _audioService,
      _dialog
    );

    setTimeout(async () => {
      /*if(this._configService.password) {
        const encrypted = await encryptNewPassword(this._configService.password);
        console.log(
          encrypted
        );
      }*/
    });
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

  getMtcbrrReferencesDialogHandler(): () => void {
    return () => {
      this.openDialogText(this._staticTextService.mtcbrrReferences)
    };
  }

  getDraftsOnOrOffHandler(): () => boolean {
    return () => this._mtcbrrService.draftsUnlocked;
  }

  getDraftsToggleHandler(): (value?: any) => void {
    return (value: any) => {
      const { checked, source }: { checked: boolean, source: MatSlideToggle } = value;

      if(checked) {
        this.openDialogInput(
          'unlock Moontide Crossbridge Revelry draft chapters',
          'input the secret password'
        ).subscribe(async (inputValue: string) => {
          const decrypted = await encryptInputPassword(
            this._configService.encrypted?.iv || [],
            this._configService.encrypted?.key || [],
            inputValue);

          if(decrypted === this._configService.encrypted?.passwordEncrypted) {
            this._mtcbrrService.draftsUnlocked = true;

            this.openDialogText('unlocked!');
          }
          else {
            source.checked = false;
            this._mtcbrrService.draftsUnlocked = false;

            inputValue && this.openDialogText('sorry ...');
          }
        });
      }
      else {
        this._mtcbrrService.draftsUnlocked = false;
      }
    };
  }
}
