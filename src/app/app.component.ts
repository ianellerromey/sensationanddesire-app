import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { DialogTextComponent } from './components/dialog-text/dialog-text.component';
import { PortalComponent } from './components/pages/portal/portal.component';
import { SrvStaticTextService } from './services/srv-statictext.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sensationanddesire-app';

  constructor(
    private _staticTextService: SrvStaticTextService,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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
  }
}
