import { Injectable } from '@angular/core';

export type Config = {
  password: string,
  hash: string
};

@Injectable({
  providedIn: 'root'
})
export class SensationAndDesireConfigService {
  private _config: Config | null = null;

  get configPassword(): string {
    return this._config?.password || '';
  }

  get configHash(): string {
    return this._config?.hash || '';
  }

  constructor() {}

  public loadConfig(): Promise<Config> {
    return new Promise(resolve => {
      fetch('../../../assets/config.json')
      .then(response => response.json())
      .then((config: Config) => {
        this._config = config;
        resolve(this._config);
      });
    })
  }

}
