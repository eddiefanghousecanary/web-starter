// @flow
import type { Action } from '../actions';
import type { Order, OrderItem, Link } from '../actions/order.actions';
import type { OrderSet } from '../constants/order-sets';

import { ORDER_SETS } from '../constants/order-sets';
import {
  ORDERS_LOAD_SUCCESS,
  ORDERS_LOAD_ERROR,
  SELECT_ORDER,
  ORDER_ITEMS_LOAD_SUCCESS,
  ORDER_ITEMS_LOAD_ERROR,
  REVIEW_ACCEPT_ORDER,
  REVIEW_REJECT_ORDER,
  REVIEW_ORDER_UPDATED
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
  selectedOrderItems: {
    loading: bool,
    links: {[key: string]: Link},
    pageItems: OrderItem[],
    errorMessage: ?string,
    page: ?number
  },
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
  selectedOrderItems: {
    loading: false,
    links: {},
    pageItems: [],
    errorMessage: null,
    page: 1
  },
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
    case ORDER_ITEMS_LOAD_SUCCESS: {
      return {
        ...state,
        selectedOrderItems: {
          loading: false,
          links: action.payload.links,
          pageItems: action.payload.orderItems,
          errorMessage: null,
          page: state.selectedOrderItems.page
        }
      };
    }
    case ORDER_ITEMS_LOAD_ERROR: {
      return {
        ...state,
        selectedOrderItems: {
          loading: false,
          links: {},
          pageItems: [],
          errorMessage: action.payload.errorMessage,
          page: state.selectedOrderItems.page
        }
      };
    }
    case REVIEW_ACCEPT_ORDER:
    case REVIEW_REJECT_ORDER: {
      return {
        ...state,
        updatingOrders: [...state.updatingOrders, action.payload.id]
      };
    }
    case REVIEW_ORDER_UPDATED: {
      const orderId = action.payload.id;
      return {
        ...state,
        updatingOrders: state.updatingOrders.filter(e => e !== orderId)
      };
    }
    default: {
      return state;
    }
  }
}
