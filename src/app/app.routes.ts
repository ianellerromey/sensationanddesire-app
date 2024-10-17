import { Routes } from '@angular/router';
import { LovComponent } from './components/pages/lov/lov.component';
import { MtcbrrComponent } from './components/pages/mtcbrr/mtcbrr.component';
import { PortalComponent } from './components/pages/portal/portal.component';

export const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  },
  {
    path: 'mtcbrr/:entryId',
    component: MtcbrrComponent
  },
  {
    path: 'lov/:entryId',
    component: LovComponent
  }
];
