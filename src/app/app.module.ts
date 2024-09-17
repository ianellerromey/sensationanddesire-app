import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SensationAndDesirePageComponent } from './components/sensation-and-desire-page/sensation-and-desire-page.component';
import { SensationAndDesireDialogComponent } from './components/sensation-and-desire-dialog/sensation-and-desire-dialog.component';
import { SensationAndDesireMenuComponent } from './components/sensation-and-desire-menu/sensation-and-desire-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SensationAndDesirePageComponent,
    SensationAndDesireDialogComponent,
    SensationAndDesireMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
