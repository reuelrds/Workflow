import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AdminService } from 'src/app/core/services/admin.service';

import * as GroupActions from './group.action';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Group } from 'src/app/shared/models/group';
import { Update } from '@ngrx/entity';

@Injectable()
export class GroupEffects {

  @Effect()
  getGroups = this.actions$.pipe(
    ofType(GroupActions.ActionTypes.TryGetGroups),
    switchMap(() => this.adminService.getGroups()),
    mergeMap(res => {
      return [{type: GroupActions.ActionTypes.GetGroups, payload: res.groups}];
    })
  );

  @Effect()
  addGroup = this.actions$.pipe(
    ofType(GroupActions.ActionTypes.TryAddGroup),
    map((action: GroupActions.TryAddGroup) => action.payload),
    switchMap(newGroupData => this.adminService.addNewGroup(newGroupData)),
    mergeMap(result => {
      return [new GroupActions.AddGroup(result.group)];
    })
  );

  @Effect()
  updateGroup = this.actions$.pipe(
    ofType(GroupActions.ActionTypes.TryUpdateGroup),
    map((action: GroupActions.TryAddGroup) => action.payload),
    switchMap(updatedDetails => this.adminService.updateGroup(updatedDetails)),
    mergeMap(result => {
      const updatedGroup: Update<Group> = {
        id: result.group.id,
        changes: {
          groupName: result.group.groupName
        }
      };
      return [new GroupActions.UpdateGroup(updatedGroup)];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
