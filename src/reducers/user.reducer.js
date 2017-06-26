// @flow
import type { Action } from '../actions';
import type { UserDetails } from '../actions/user.actions';

import { USER_LOAD_COMPLETE } from '../actions/user.actions';

export type UserState = {
  userDetails: ?UserDetails
}

const defaultState = {
  userDetails: null
};

export function userReducer (previousState : UserState = defaultState, action : Action) : UserState {
  switch (action.type) {
    case USER_LOAD_COMPLETE: {
      return {
        userDetails: action.payload.userDetails
      };
    }
    default: {
      return previousState;
    }
  }
}
