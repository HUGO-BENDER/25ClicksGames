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
import { TileGameComponent } from './components/tile-game/tile-game.component';
import { BackgroundSpaceComponent } from './components/background-space/background-space.component';
//#endregion

@NgModule({
  declarations: [RefactoryComponent, PanAndZoomDirective, TileGameComponent, BackgroundSpaceComponent],
  imports: [
    CommonModule,
    RefactoryRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
  exports: [PanAndZoomDirective],
})
export class RefactoryModule {}
