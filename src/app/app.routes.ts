import { Routes } from '@angular/router';
import { LilacComponent } from './components/pages/lilac/lilac.component';
import { MtcbrrComponent } from './components/pages/mtcbrr/mtcbrr.component';
import { PortalComponent } from './components/pages/portal/portal.component';
import { ShortsComponent } from './components/pages/shorts/shorts.component';
import { YanComponent } from './components/pages/yan/yan.component';

export const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  },
  {
    path: 'lilac/:entryId',
    component: LilacComponent
  },
  {
    path: 'mtcbrr/:entryId',
    component: MtcbrrComponent
  },
  {
    path: 'yan/:entryId',
    component: YanComponent
  },
  {
    path: 'shorts/:entryId',
    component: ShortsComponent
  },
];
