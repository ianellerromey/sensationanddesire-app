import { Component, EventEmitter, Output } from '@angular/core';
import { SrvStaticTextService } from '../../services/srv-statictext.service';

@Component({
  selector: 'app-overlay-disclaimer',
  standalone: true,
  imports: [],
  templateUrl: './overlay-disclaimer.component.html',
  styleUrl: './overlay-disclaimer.component.scss'
})
export class OverlayDisclaimerComponent {
  @Output() closeOverlay = new EventEmitter<void>();

  get disclaimer(): string {
    return this._staticTextService.disclaimer;
  }

  constructor(
    private _staticTextService: SrvStaticTextService
  ) {
  }

  enter(): void {
    this.closeOverlay.emit();
  }

  leave(): void {
    window.location.replace('https://www.wikipedia.org/');
  }
}
