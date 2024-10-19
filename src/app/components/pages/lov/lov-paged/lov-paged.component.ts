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

  protected override disableScrollingCheck(): boolean {
    const _mtcbrrService: SrvLovService = this._pagedService as SrvLovService;

    const { document: { body } } = window;

    const tempSadContent = document.createElement('div');
    tempSadContent.className = 'sad-content';

    _mtcbrrService.node?.entry.content?.forEach((content: string) => {
      const tempSadContentImageDiv = document.createElement('div');
      tempSadContentImageDiv.className = 'sad-content-image';

      const tempSadContentImage = document.createElement('img');
      tempSadContentImage.src = content || '';

      tempSadContentImageDiv.appendChild(tempSadContentImage);
      
      tempSadContent.appendChild(tempSadContentImageDiv);
    })

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
    this._router.navigate([`/lov/${entryId}`]);
  }
}
