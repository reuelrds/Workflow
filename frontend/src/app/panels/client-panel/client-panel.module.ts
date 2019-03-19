import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ClientPanelRoutingModule } from './client-panel-routing.module';
import { ClientPanelComponent } from './components/client-panel.component';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

import { userReducer } from './store/user/user.reducers';

@NgModule({
  imports: [
    CommonModule,
    ClientPanelRoutingModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('user', userReducer)
  ],
  declarations: [ClientPanelComponent]
})
export class ClientPanelModule { }
