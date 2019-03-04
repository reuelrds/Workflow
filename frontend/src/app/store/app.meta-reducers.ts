import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducers } from './app.reducers';

import * as AuthActions from './../auth/store/auth.actions';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {

    if (action.type === AuthActions.ActionTypes.Logout) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug, clearState];
