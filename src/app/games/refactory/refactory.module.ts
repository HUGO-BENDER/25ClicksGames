import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefactoryRoutingModule } from './routing/refactory-routing.module';
import { RefactoryComponent } from '../refactory/refactory.component';

//#region Material
import { AppMaterialModule } from '../../components/app-material/app-material.module';
//#endregion

//#region Shared
import { SharedModule } from '../../shared-components/shared.module';
import { PanAndZoomDirective } from 'src/app/shared-components/app-pan-and-zoom/pan-and-zoom.directive';
//#endregion

@NgModule({
  declarations: [RefactoryComponent, PanAndZoomDirective],
  imports: [
    CommonModule,
    RefactoryRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
  exports: [PanAndZoomDirective],
})
export class RefactoryModule {}
