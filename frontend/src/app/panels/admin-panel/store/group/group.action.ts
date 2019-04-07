import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Group } from 'src/app/shared/models/group';

export enum ActionTypes {
  TryAddGroup = '[Group Dialog] Try Add Group',
  AddGroup = '[Group API] Add Group',
  TryGetGroups = '[Group Dialog] Try Get Groups',
  GetGroups = '[Group API] Get Groups',
  TryUpdateGroup = '[Group Dialog] Try Update Group',
  UpdateGroup = '[Group API] Update Group'
}

export class AddGroup implements Action {
  readonly type = ActionTypes.AddGroup;

  constructor(public payload: Group) {}
}

export class TryAddGroup implements Action {
  readonly type = ActionTypes.TryAddGroup;

  constructor(
    public payload: {
      groupName: string;
    }
  ) {}
}

export class TryGetGroups implements Action {
  readonly type = ActionTypes.TryGetGroups;
}

export class GetGroups implements Action {
  readonly type = ActionTypes.GetGroups;

  constructor(public payload: Group[]) {}
}

export class TryUpdateGroup implements Action {
  readonly type = ActionTypes.TryUpdateGroup;

  constructor(
    public payload: {
      group: {
        groupName: string;
        id: string;
      },
      updateField: string;
    }
  ) {}
}

export class UpdateGroup implements Action {
  readonly type = ActionTypes.UpdateGroup;

  constructor(public payload: Update<Group>) {}
}

export type GroupActions =
  | AddGroup
  | TryAddGroup
  | GetGroups
  | TryGetGroups
  | UpdateGroup
  | TryUpdateGroup;
