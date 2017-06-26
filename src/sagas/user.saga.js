// @flow
/* global Generator */
import type { IOEffect } from 'redux-saga';

import { call, put } from 'redux-saga/effects';
import { CrossStorageClient } from 'cross-storage';
import { userLoadComplete } from '../actions/user.actions';
import { redirectToLogin, redirectToSelectTeam } from './helpers';

var SETTINGS = window.SETTINGS;
const storage = new CrossStorageClient(`${SETTINGS.ACCOUNT_MANAGER_URL}/crosshub/index.html`);

export function * loadUserSaga (loginRequired : boolean) : Generator<IOEffect, *, *> {
  // Wait for cross storage to connect
  yield call([storage, storage.onConnect]);

  // Get the user
  let userDetails = yield call([storage, storage.get], 'user');
  if (typeof userDetails === 'string') {
    userDetails = JSON.parse(userDetails);
  }

  // Check if we need to login or select team
  if (userDetails == null && loginRequired) {
    yield call(redirectToLogin);
    return;
  } else if (userDetails.current_organization == null) {
    yield call(redirectToSelectTeam);
    return;
  }

  if (userDetails) {
    userDetails = {
      email: userDetails.user.email,
      firstName: userDetails.user.first_name,
      lastName: userDetails.user.last_name,
      orgName: userDetails.current_organization.name,
      token: userDetails.validity.token
    };
  }

  yield put(userLoadComplete(userDetails));
}
