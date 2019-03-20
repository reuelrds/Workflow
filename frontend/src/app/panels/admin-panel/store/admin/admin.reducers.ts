import * as AdminActions from './admin.actions';
import { User } from 'src/app/shared/models/user';


export interface State {
  id: string;
  users: User[];
}

const initialState: State = {
  id: null,
  users: []
};

export function adminReducer(state = initialState, action: AdminActions.AdminActions) {

  switch (action.type) {
    case AdminActions.ActionTypes.SetAdminId:
      return {
        ...state,
        id: action.payload
      };
    case AdminActions.ActionTypes.AddUser:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
}
