import * as AdminActions from './admin.actions';


export interface State {
  id: string;
}

const initialState: State = {
  id: null
};

export function adminReducer(state = initialState, action: AdminActions.AdminActions) {

  switch (action.type) {
    case AdminActions.ActionTypes.SetAdminId:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
}
