import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from '../page-home/page-home.component';
import { PageAboutComponent } from '../page-about/page-about.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PagePolicyPrivacyComponent } from '../page-policy-privacy/page-policy-privacy.component';
import { PageServiceConditionsComponent } from '../page-service-conditions/page-service-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent,
  },
  {
    path: 'home',
    component: PageHomeComponent,
  },
  {
    path: 'about',
    component: PageAboutComponent,
  },
  {
    path: 'policyprivacy',
    component: PagePolicyPrivacyComponent,
  },
  {
    path: 'serviceconditions',
    component: PageServiceConditionsComponent,
  },
  {
    path: 'games/refactory/:id/:user',
    loadChildren: () =>
      import('../../games/refactory/refactory.module').then(
        (m) => m.RefactoryModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
