// @flow
export const USER_LOAD_COMPLETE = 'USER_LOAD_COMPLETE';

export type UserDetails = {
  email: string,
  firstName: string,
  lastName: string,
  orgName: string,
  token: string
}

export type UserAction = { type: 'USER_LOAD_COMPLETE', payload: {userDetails: ?UserDetails} };

export const userLoadComplete = (userDetails : ?UserDetails) : UserAction => ({ type: USER_LOAD_COMPLETE, payload: {userDetails} });
