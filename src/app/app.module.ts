import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SensationAndDesireBlogComponent } from './components/sensation-and-desire-blog/sensation-and-desire-blog.component';
import { SensationAndDesireDialogComponent } from './components/sensation-and-desire-dialog/sensation-and-desire-dialog.component';
import { SensationAndDesireInputDialogComponent } from './components/sensation-and-desire-input-dialog/sensation-and-desire-input-dialog.component';
import { SensationAndDesireMenuComponent } from './components/sensation-and-desire-menu/sensation-and-desire-menu.component';
import { SensationAndDesirePageComponent } from './components/sensation-and-desire-page/sensation-and-desire-page.component';
import { SensationAndDesireConfigService } from './services/sensation-and-desire-config-service.service';


@NgModule({
  declarations: [
    AppComponent,
    SensationAndDesirePageComponent,
    SensationAndDesireDialogComponent,
    SensationAndDesireMenuComponent,
    SensationAndDesireBlogComponent,
    SensationAndDesireInputDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [SensationAndDesireConfigService],
      useFactory: (configService: SensationAndDesireConfigService) => {
        return () => {
          return configService.loadConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
