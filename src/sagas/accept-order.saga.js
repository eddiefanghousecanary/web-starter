// @flow
/* global Generator */
import type { IOEffect } from 'redux-saga';
import type { AcceptOrderAcceptedAction } from '../actions/accept-order.actions';

import { delay } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Client } from '../api/order-manager-api-client';
import { resetAcceptOrder, acceptOrderLoadComplete, acceptOrderLoadError, acceptOrderComplete, ORDER_ACCEPTED } from '../actions/accept-order.actions';
import { handleStandardExceptions } from './helpers';

export function * loadAcceptOrderDetailsSaga ({orderId} : {orderId : string}) : Generator<IOEffect, *, *> {
  yield put(resetAcceptOrder());

  try {
    const userDetails = yield select(state => state.user.userDetails);

    // Call the API to get the order details
    const client = new Client(userDetails.token);
    const response = yield call([client, client.getAcceptOrderDetails], orderId);
    let orderDetails = {
      orderId: orderId,
      orderType: response.order_type,
      address: response.address,
      unit: response.unit,
      city: response.city,
      state: response.state,
      zipcode: response.zipcode
    };
    if (response.appraisal_link) {
      orderDetails.link = response.appraisal_link;
    }
    yield put(acceptOrderLoadComplete(orderDetails));
  } catch (e) {
    yield call(handleStandardExceptions, e);
    yield put(acceptOrderLoadError(e.message));
  }
}

export function * acceptOrder (action : AcceptOrderAcceptedAction) : Generator<IOEffect, *, *> {
  const client = new Client(action.payload.token);
  try {
    yield call([client, client.submitAcceptOrder], action.payload.orderId);
    let link = null;
    while (!link) {
      const orderDetails = yield call([client, client.getAcceptOrderDetails], action.payload.orderId);
      if (orderDetails['appraisal_link']) {
        link = orderDetails['appraisal_link'];
      }
      yield call(delay, 1000);
    }
    yield put(acceptOrderComplete(link));
  } catch (e) {
    yield put(acceptOrderLoadError(e.message));
  }
}

export function * acceptOrderSaga () : Generator<IOEffect, *, *> {
  yield takeEvery(ORDER_ACCEPTED, acceptOrder);
}
