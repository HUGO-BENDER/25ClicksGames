import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefactoryComponent } from '../refactory/refactory.component';

const routes: Routes = [
  {
    path: '',
    component: RefactoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefactoryRoutingModule {}
