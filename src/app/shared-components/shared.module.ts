import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLogoComponent } from './app-logo/app-logo.component';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AppLogoComponent, AppSidenavComponent],
  exports: [AppLogoComponent, AppSidenavComponent],
})
export class SharedModule {}
