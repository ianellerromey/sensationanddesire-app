import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lov, SrvLovService } from '../../../../services/srv-lov.service';
import { PagedComponent } from '../../paged/paged.component';

@Component({
  selector: 'app-lov-paged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../paged/paged.component.html',
  styleUrl: '../../paged/paged.component.scss'
})
export class LovPagedComponent extends PagedComponent<Lov> {
  constructor(
    private _router: Router,
    _lovService: SrvLovService
  ) {
    super(_lovService);
  }

  protected override navigateToEntry(entryId: number): void
  {
    this._router.navigate([`/lov/${entryId}`]);
  }
}
