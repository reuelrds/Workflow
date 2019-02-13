import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }
