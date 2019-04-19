import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AddLocationDialogComponent } from './dialog/add-location-dialog/add-location-dialog.component';

import { Location } from 'src/app/shared/models/location';

import * as fromAdminPanel from '../../../../store/admin-panel.reducers';
import * as LocationActions from './store/location.action';
import * as fromLocationSelector from './store/location.selectors';
import * as fromUserSelector from '../user-management-dialog/store/user.selectors';
import * as UserActions from '../user-management-dialog/store/user.actions';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit {
  addLocationDialog: MatDialogRef<AddLocationDialogComponent>;
  dataSet: Observable<Location[]>;
  users: Observable<User[]>;
  cols: string[] = [
    'select',
    'locationName',
    'locationHeadName',
    'staffCount',
    'icons'
  ];

  constructor(
    private dialog: MatDialog,
    private store: Store<fromAdminPanel.State>
  ) {}

  ngOnInit() {
    // this.store.dispatch(new LocationActions.TryGetLocations());
    // this.store.dispatch(new UserActions.TryGetUsers());
    // const locationState = this.store.pipe(select(fromLocationSelector.getAllLocations));

    const locationState = this.store.pipe(select(fromLocationSelector.dep));
    const userState = this.store.pipe(select(fromUserSelector.getAllUsers));

    locationState.subscribe(locations => (this.dataSet = of(locations)));
    userState.subscribe(users => (this.users = of(users)));
  }

  openAddLocationDialog(location = null) {
    this.addLocationDialog = this.dialog.open(AddLocationDialogComponent, {
      width: 'max-content',
      height: 'max-content',
      minWidth: '20vw',
      minHeight: '20vh',
      autoFocus: false,
      data: {
        users: this.users,
        location
      }
    });

    this.addLocationDialog.afterClosed().subscribe(result => {
      if (result && !location) {
        this.store.dispatch({
          type: LocationActions.ActionTypes.TryAddLocation,
          payload: result.value
        });
      } else if (result && location) {
        const updatedDetails = {
          location: result.value,
          updateField: ''
        };

        updatedDetails.updateField =
          result.value.locationName === location.locationName
            ? 'head'
            : 'name';
        console.log(updatedDetails);
        this.store.dispatch(new LocationActions.TryUpdateLocation(updatedDetails));
      }
    });
  }

  onOpenDialog(event) {
    console.log(event);
    if (event.dialogType === 'editDialog') {
      this.openAddLocationDialog(event.location);
    }
  }
}
