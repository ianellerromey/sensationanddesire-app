import { FullscreenOverlayContainer, Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { DialogTextComponent } from './components/dialog-text/dialog-text.component';
import { OverlayDisclaimerComponent } from './components/overlay-disclaimer/overlay-disclaimer.component';
import { PortalComponent } from './components/pages/portal/portal.component';
import { SrvStaticTextService } from './services/srv-statictext.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OverlayModule, PortalComponent],
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sensationanddesire-app';

  constructor(
    private _staticTextService: SrvStaticTextService,
    private _overlay: Overlay,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically()
    });
    const portal = new ComponentPortal(OverlayDisclaimerComponent);

    overlayRef.attach(portal).instance.closeOverlay.subscribe(() => overlayRef.detach());

    overlayRef.detachments().subscribe(() => {
      setTimeout(() => {
        if(this._staticTextService.notice) {
          this._dialog.open(
            DialogTextComponent,
            {
              data: {
                text: this._staticTextService.notice
              }
            }
          );
        }
      }, 300);
    });
  }
}
