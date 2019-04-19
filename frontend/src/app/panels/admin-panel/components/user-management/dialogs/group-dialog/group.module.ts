import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { groupReducer } from './store/group.reducers';
import { GroupEffects } from './store/group.effects';

import { GroupDialogComponent } from './group-dialog.component';
import { AddGroupDialogComponent } from './dialog/add-group-dialog/add-group-dialog.component';
import { GroupDataTableComponent } from './group.data-table/group-data-table.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('group', groupReducer),
    EffectsModule.forFeature([
      GroupEffects
    ])
  ],
  declarations: [
    GroupDialogComponent,
    AddGroupDialogComponent,
    GroupDataTableComponent
  ],
  entryComponents: [
    GroupDialogComponent,
    AddGroupDialogComponent
  ]
})

export class GroupModule {}
