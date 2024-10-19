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

  protected override disableScrollingCheck(): boolean {
    const _mtcbrrService: SrvMtcbrrService = this._pagedService as SrvMtcbrrService;

    const { document: { body } } = window;

    const tempSadContentFulltext = document.createElement('div');
    tempSadContentFulltext.className = 'sad-content-fulltext';
    tempSadContentFulltext.innerText = _mtcbrrService.node?.entry.content || '';

    const tempSadContent = document.createElement('div');
    tempSadContent.className = 'sad-content';
    tempSadContent.appendChild(tempSadContentFulltext);

    const tempSadPage = document.createElement('div');
    tempSadPage.className = 'sad-page';
    tempSadPage.appendChild(tempSadContent);

    body.appendChild(tempSadPage);

    const disable = tempSadPage.offsetHeight <= window.innerHeight;

    body.removeChild(tempSadPage);
    tempSadPage.remove();

    return disable;
  }

  protected override navigateToEntry(entryId: number): void
  {
    this._router.navigate([`/mtcbrr/${entryId}`]);
  }
}
