import { Injectable } from '@angular/core';

export type SrvConfig = { 
  password: string | null;
  encrypted: {
    iv: number[] | null;
    key: number[] | null;
    passwordEncrypted: string | null;
  } | null;
};

@Injectable({
  providedIn: 'root'
})
export class SrvConfigService {
  private _config: SrvConfig | null = null;

  get password(): string | null {
    return this._config?.password || null;
  }

  get encrypted(): {
    iv: number[] | null;
    key: number[] | null;
    passwordEncrypted: string | null;
  } | null {
    return this._config?.encrypted || null;
  }

  constructor() { }

  loadConfig(): Promise<SrvConfig> {
    return new Promise((resolve) => fetch('../../../assets/sad-config.json')
      .then((data: Response) => data.json())
      .then((data: SrvConfig) => resolve(this._config = data)));
  }
}
