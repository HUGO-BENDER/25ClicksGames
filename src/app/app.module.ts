import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PagePolicyPrivacyComponent } from './components/page-policy-privacy/page-policy-privacy.component';
import { PageServiceConditionsComponent } from './components/page-service-conditions/page-service-conditions.component';
import { AppLogoComponent } from './shared-components/app-logo/app-logo.component';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { RefactoryComponent } from './games/refactory/refactory/refactory.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageAboutComponent,
    PageNotFoundComponent,
    PagePolicyPrivacyComponent,
    PageServiceConditionsComponent,
    AppLogoComponent,
    AppToolbarComponent,
    RefactoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
