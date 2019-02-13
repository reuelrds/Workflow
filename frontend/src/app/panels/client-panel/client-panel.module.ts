import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPanelRoutingModule } from './client-panel-routing.module';
import { ClientPanelComponent } from './components/client-panel.component';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    ClientPanelRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [ClientPanelComponent]
})
export class ClientPanelModule { }
