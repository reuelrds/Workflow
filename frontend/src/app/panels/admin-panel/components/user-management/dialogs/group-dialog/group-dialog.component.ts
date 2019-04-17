import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { AddGroupDialogComponent } from './dialog/add-group-dialog/add-group-dialog.component';

import { Group } from 'src/app/shared/models/group';

import * as fromAdminPanel from '../../../../store/admin-panel.reducers';
import * as GroupActions from './../../../../store/group/group.action';
import * as fromGroupSelector from './../../../../store/group/group.selectors';
import * as fromUserSelector from './../../../../store/users/user.selectors';
import * as UserActions from '../../../../store/users/user.actions';
import { User } from 'src/app/shared/models/user';
import { Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  addGroupDialog: MatDialogRef<AddGroupDialogComponent>;
  dataSet: Observable<Group[]>;
  users: Observable<User[]>;
  cols: string[] = [
    'select',
    'groupName',
    'staffCount',
    'icons'
  ];

  newGroupMembers: Group[];


  constructor(
    private dialog: MatDialog,
    private store: Store<fromAdminPanel.State>,
    private actions$: Actions
  ) {}

  ngOnInit() {
    // this.store.dispatch(new GroupActions.TryGetGroups());
    // this.store.dispatch(new UserActions.TryGetUsers());
    const groupState = this.store.pipe(select(fromGroupSelector.getAllGroups));
    const userState = this.store.pipe(select(fromUserSelector.getAllUsers));

    groupState.subscribe(groups => (this.dataSet = of(groups)));
    userState.subscribe(users => (this.users = of(users)));

  }

  openAddGroupDialog(group = null) {
    this.addGroupDialog = this.dialog.open(AddGroupDialogComponent, {
      width: 'max-content',
      height: '45vh',
      minWidth: '20vw',
      // minHeight: '20vh',
      autoFocus: false,
      data: {
        users: this.users,
        group
      }
    });

    this.addGroupDialog.afterClosed().subscribe((result: {form: FormGroup, members: User[]}) => {
      console.log(result);
      if (result.form && !group) {
        this.store.dispatch({
          type: GroupActions.ActionTypes.TryAddGroup,
          payload: result.form.value
        });

        this.actions$.pipe(
          ofType(GroupActions.ActionTypes.AddGroup)
          ).subscribe((newAddGroupAction: GroupActions.AddGroup) => {
            const groupId = newAddGroupAction.payload.id;
            console.log(result.members);
            result.members.forEach((member: User) => {
              const actionPayload = {
                userId: member.id,
                groupId
              };
              this.store.dispatch(new UserActions.TryUpdateUsersGroup(actionPayload));
            });
        });
      } else if (result.form && group) {
        const updatedDetails = {
          group: result.form.value,
          updateField: ''
        };

        updatedDetails.updateField = 'name';
        console.log(updatedDetails);

        this.store.dispatch(new GroupActions.TryUpdateGroup(updatedDetails));

      }
    });
  }

  onOpenDialog(event) {
    console.log(event);
    if (event.dialogType === 'editDialog') {
      this.openAddGroupDialog(event.group);
    }
  }
}
