import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, DragDropModule],
  exports: [MatSidenavModule, MatButtonModule, MatIconModule, DragDropModule],
  declarations: [],
})
export class AppMaterialModule {}
