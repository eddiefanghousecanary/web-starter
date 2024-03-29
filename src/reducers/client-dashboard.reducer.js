// @flow
import type { Action } from '../actions';
import type { Order, Link } from '../actions/order.actions';
import type { OrderSet } from '../constants/order-sets';

import { ORDER_SETS } from '../constants/order-sets';
import {
  ORDERS_LOAD_SUCCESS,
  ORDERS_LOAD_ERROR,
  SELECT_ORDER
} from '../actions/order.actions';

export type ClientDashboardState = {
  activeOrders: {
    links: {[key: string]: Link},
    pageItems: Order[],
    errorMessage: ?string,
    page: number
  },
  completedOrders: {
    links: {[key: string]: Link},
    pageItems: Order[],
    errorMessage: ?string,
    page: number
  },
  selectedOrder: ?Order,
  updatingOrders: string[],
  orderSet: OrderSet
}

const defaultState = {
  activeOrders: {
    links: {},
    pageItems: [],
    errorMessage: null,
    page: 1
  },
  completedOrders: {
    links: {},
    pageItems: [],
    errorMessage: null,
    page: 1
  },
  selectedOrder: null,
  updatingOrders: [],
  orderSet: ORDER_SETS.ACTIVE
};

export function clientDashboardReducer (state : ClientDashboardState = defaultState, action : Action) : ClientDashboardState {
  switch (action.type) {
    case ORDERS_LOAD_SUCCESS: {
      return {
        ...state,
        [action.payload.set]: {
          pageItems: action.payload.orders,
          links: action.payload.links,
          errorMessage: null,
          page: action.payload.page
        },
        orderSet: action.payload.set
      };
    }
    case ORDERS_LOAD_ERROR: {
      return {
        ...state,
        [action.payload.set]: {
          pageItems: [],
          links: {},
          errorMessage: action.payload.errorMessage
        }
      };
    }
    case SELECT_ORDER: {
      return {
        ...state,
        selectedOrder: action.payload.order
      };
    }
    default: {
      return state;
    }
  }
}
