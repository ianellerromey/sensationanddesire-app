import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routes } from './app.routes';
import { SrvConfigService } from './services/srv-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [SrvConfigService],
      useFactory: (configService: SrvConfigService) => {
        return () => {
          return configService.loadConfig();
        };
      }
    }
  ]
};
