import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lilac, SrvLilacService } from '../../../../services/srv-lilac.service';
import { PagedComponent } from '../../paged/paged.component';

@Component({
  selector: 'app-lilac-paged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../paged/paged.component.html',
  styleUrl: '../../paged/paged.component.scss'
})
export class LilacPagedComponent extends PagedComponent<Lilac> {
  constructor(
    private _router: Router,
    _lilacService: SrvLilacService
  ) {
    super(_lilacService);
  }

  protected override disableScrollingCheck(): boolean {
    const _lilacService: SrvLilacService = this._pagedService as SrvLilacService;

    const { document: { body } } = window;

    const tempSadContentFulltext = document.createElement('div');
    tempSadContentFulltext.className = 'sad-content-fulltext';
    tempSadContentFulltext.innerText = _lilacService.node?.entry.content || '';

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
    this._router.navigate([`/lilac/${entryId}`]);
  }
}
