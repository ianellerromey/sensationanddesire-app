import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensationAndDesirePageComponent } from './components/sensation-and-desire-page/sensation-and-desire-page.component';

const routes: Routes = [
  { path: '', component: SensationAndDesirePageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
