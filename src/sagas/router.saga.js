// @flow
import type { ViewTypes } from '../actions/view.actions';

import { call, fork, put } from 'redux-saga/effects';
import { router } from 'redux-saga-router';
import { history } from '../history/history';
import { viewLoading, viewLoaded } from '../actions/view.actions';
import { ROUTES } from '../routes';
import { loadUserSaga } from './user.saga';

function wrapSaga (view : ViewTypes, loginRequired, saga) {
  return function * (args) {
    try {
      yield put(viewLoading(view));
      yield call(loadUserSaga, loginRequired);
      yield call(saga, args);
      yield put(viewLoaded(view));
    } catch (e) {

    }
  };
}

const ROUTE_ACTIONS = Object.keys(ROUTES).reduce((routeActions, key) => {
  const def = ROUTES[key];
  routeActions[key] = wrapSaga(def.id, def.requiresLogin, def.saga);
  return routeActions;
}, {});

export function * routerSaga () : * {
  yield fork(router, history, ROUTE_ACTIONS);
}

if (module.hot) {
  (module.hot : any).accept('../routes', () => { });
}
