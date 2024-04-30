import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensationAndDesirePageComponent } from './components/sensationanddesire-page/sensationanddesire-page.component';

const routes: Routes = [
  { path: '', component: SensationAndDesirePageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
