import * as UserActions from './user.actions';


export interface State {
  id: string;
}

const initialState: State = {
  id: null
};

export function userReducer(state = initialState, action: UserActions.UserActions) {

  switch (action.type) {
    case UserActions.ActionTypes.SetUserId:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
}
