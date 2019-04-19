import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { locationReducer } from './store/location.reducers';
import { LocationEffects } from './store/location.effects';

import { LocationDialogComponent } from './location-dialog.component';
import { AddLocationDialogComponent } from './dialog/add-location-dialog/add-location-dialog.component';
import { LocationDataTableComponent } from './location.data-table/location-data-table.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('location', locationReducer),
    EffectsModule.forFeature([
      LocationEffects
    ])
  ],
  declarations: [
    LocationDialogComponent,
    AddLocationDialogComponent,
    LocationDataTableComponent
  ],
  entryComponents: [
    LocationDialogComponent,
    AddLocationDialogComponent
  ]
})

export class LocationModule {}
