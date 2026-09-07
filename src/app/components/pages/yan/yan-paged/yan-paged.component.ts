import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SrvYanService, Yan } from '../../../../services/srv-yan.service';
import { PagedComponent } from '../../paged/paged.component';

@Component({
  selector: 'app-yan-paged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../paged/paged.component.html',
  styleUrl: '../../paged/paged.component.scss'
})
export class YanPagedComponent extends PagedComponent<Yan> {
  constructor(
    private _router: Router,
    _yanService: SrvYanService
  ) {
    super(_yanService);
  }

  protected override disableScrollingCheck(): boolean {
    const _yanService: SrvYanService = this._pagedService as SrvYanService;

    const { document: { body } } = window;

    const tempSadContentFulltext = document.createElement('div');
    tempSadContentFulltext.className = 'sad-content-fulltext';
    tempSadContentFulltext.innerText = _yanService.node?.entry.content || '';

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
    this._router.navigate([`/yan/${entryId}`]);
  }
}
