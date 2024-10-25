import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SrvConfig = {
  sadMapFile: string;
  draftUnlocking: {
    password: string | null;
    encrypted: {
      iv: number[] | null;
      key: number[] | null;
      passwordEncrypted: string | null;
    } | null;
  };
};

@Injectable({
  providedIn: 'root'
})
export class SrvConfigService {
  private _config: SrvConfig | null = null;
  private _loadedSubject = new BehaviorSubject<SrvConfig | null>(null);

  get sadMapFile(): string | null {
    return this._config?.sadMapFile || null;
  }

  get draftUnlockingPassword(): string | null {
    return this._config?.draftUnlocking?.password || null;
  }

  get draftUnlockingEncrypted(): {
    iv: number[] | null;
    key: number[] | null;
    passwordEncrypted: string | null;
  } | null {
    return this._config?.draftUnlocking?.encrypted || null;
  }

  get loaded(): BehaviorSubject<SrvConfig | null> {
    return this._loadedSubject;
  }

  constructor() { }

  loadConfig(): Promise<SrvConfig> {
    return new Promise((resolve) => fetch('../../../assets/sad-config.json')
      .then((data: Response) => data.json())
      .then((data: SrvConfig) => {
          this._config = data;
          this._loadedSubject.next(this._config);
          resolve(this._config);
        }
      ));
  }
}
