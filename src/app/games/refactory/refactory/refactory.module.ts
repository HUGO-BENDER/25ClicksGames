import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefactoryRoutingModule } from './refactory-routing.module';
import { RefactoryComponent } from '../refactory/refactory.component';


@NgModule({
  declarations: [
    RefactoryComponent
  ],
  imports: [
    CommonModule,
    RefactoryRoutingModule
  ]
})
export class RefactoryModule { }
