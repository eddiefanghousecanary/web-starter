// @flow
/* global Generator */
import camelCase from 'lodash.camelcase';
import { delay } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { IOEffect } from 'redux-saga';

import type { OrderSet } from '../constants/order-sets';

import type { CreateOrderAction } from '../actions/order.actions';
import { Client } from '../api/api-client';
import {
  CREATE_ORDER,
  createOrderError,
  createOrderSuccess,
  ordersLoadSuccess,
  ordersLoadError,
  selectOrder,
} from '../actions/order.actions';
import { handleStandardExceptions, camelToSnake, snakeToCamel } from './helpers';
import { ORDER_SETS } from '../constants/order-sets';
import userDetailsSelector from '../selectors/user-details.selector';
import selectedOrderSelector from '../selectors/selected-order.selector';
import orderSetSelector from '../selectors/order-set.selector';
import ordersPageSelector from '../selectors/orders-page.selector';

const SNAKE_ORDER_CREATE_FIELDS = [
  'name'
];

const CAMEL_ORDER_CREATE_FIELDS = SNAKE_ORDER_CREATE_FIELDS.map(camelCase);

const SNAKE_ORDER_FIELDS = [
  'id',
  'customer_order_id',
  'name',
  'order_type',
  'inspection_partner',
  'valuation_partner',
  'status'
];

const ORDER_POLL_INTERVAL = 5000;

export function * loadClientDashboardSaga ({set = ORDER_SETS.ACTIVE, page = 1} : {set? : OrderSet, page? : number}) : Generator<IOEffect, *, *> {
  try {
    const userDetails = yield select(userDetailsSelector);
    const client = new Client(userDetails.token);
    // TODO: pass statuses here when backend works
    // const {links, data} = yield call([client, client.getOrders], page, ORDER_SET_TO_STATUSES[orderSet]);
    const {links, data} = yield call([client, client.getOrders], page);
    const orders = data.map(item => snakeToCamel(item, SNAKE_ORDER_FIELDS, {}, false));
    yield put(ordersLoadSuccess(set, orders, links, page));
  } catch (e) {
    yield call(handleStandardExceptions, e);
    yield put(ordersLoadError(set, e.message));
  }
}

export function * reloadClientDashboardSaga () : Generator<IOEffect, *, *> {
  const orderSet = yield select(orderSetSelector);
  const ordersPage = yield select(ordersPageSelector);
  yield call(loadClientDashboardSaga, {set: orderSet, page: ordersPage});
}

export function * createOrder (action : CreateOrderAction) : Generator<IOEffect, *, *> {
  try {
    let formData = new window.FormData();
    const orderDetails = action.payload.orderDetails;
    const orderDetailsSnake = camelToSnake(orderDetails, CAMEL_ORDER_CREATE_FIELDS);
    for (const k of Object.keys(orderDetailsSnake)) {
      formData.append(k, orderDetailsSnake[k]);
    }

    // Call the API to get the order details
    const userDetails = yield select(userDetailsSelector);
    const client = new Client(userDetails.token);
    yield call([client, client.createNewOrder], formData);
    yield put(createOrderSuccess());
    yield call(reloadClientDashboardSaga);
  } catch (e) {
    yield call(handleStandardExceptions, e);
    if (e.name === 'ValidationError') {
      const validationErrors = snakeToCamel(e.data, SNAKE_ORDER_CREATE_FIELDS, {}, false);
      yield put(createOrderError('Cannot create order', validationErrors));
      return;
    }
    yield put(createOrderError(e.message));
  }
}

export function * createOrderSaga () : Generator<IOEffect, *, *> {
  yield takeEvery(CREATE_ORDER, createOrder);
}

export function * loadOrderDetail ({orderId, page} : {orderId: number, page: number}) : Generator<IOEffect, *, *> {
  try {
    const userDetails = yield select(userDetailsSelector);
    const client = new Client(userDetails.token);
    const selectedOrder = yield select(selectedOrderSelector);
    if (!selectedOrder) {
      const orderDetails = yield call([client, client.getOrderDetails], orderId);
      yield put(selectOrder(orderDetails));
    }
  } catch (e) {
    yield call(handleStandardExceptions, e);
  }
}

export function * awaitOrderStatus (id : string, fromStatus : string, client : Client) : Generator<IOEffect, *, *> {
  while (true) {
    yield call(delay, ORDER_POLL_INTERVAL);
    const orderDetails = yield call([client, client.getOrderDetails], id);
    if (orderDetails.status !== fromStatus) {
      break;
    }
  }
}
