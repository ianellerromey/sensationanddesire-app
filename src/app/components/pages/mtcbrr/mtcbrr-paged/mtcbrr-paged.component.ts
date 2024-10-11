import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mtcbrr, SrvMtcbrrService } from '../../../../services/srv-mtcbrr.service';
import { PagedComponent } from '../../paged/paged.component';

@Component({
  selector: 'app-mtcbrr-paged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../paged/paged.component.html',
  styleUrl: '../../paged/paged.component.scss'
})
export class MtcbrrPagedComponent extends PagedComponent<Mtcbrr> {
  constructor(
    private _router: Router,
    _mtcbrrService: SrvMtcbrrService
  ) {
    super(_mtcbrrService);
  }

  protected override navigateToEntry(entryId: number): void
  {
    this._router.navigate([`/mtcbrr/${entryId}`]);
  }
}
