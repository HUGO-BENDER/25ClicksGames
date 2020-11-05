import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefactoryRoutingModule } from './routing/refactory-routing.module';
import { RefactoryComponent } from '../refactory/refactory.component';

//#region Material
import { AppMaterialModule } from '../../../components/app-material/app-material.module';
//#endregion

//#region Shared
import { SharedModule } from '../../../shared-components/shared.module';
//#endregion

@NgModule({
  declarations: [RefactoryComponent],
  imports: [
    CommonModule,
    RefactoryRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class RefactoryModule {}
