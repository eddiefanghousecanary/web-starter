// @flow
import type { Action } from '../actions';
import type { OrderDetails } from '../actions/accept-order.actions';

import { ACCEPT_ORDER_RESET, ACCEPT_ORDER_LOAD_COMPLETE, ACCEPT_ORDER_LOAD_ERROR, ORDER_ACCEPTED, ORDER_REJECTED, ORDER_ACCEPTED_COMPLETE } from '../actions/accept-order.actions';

export type AcceptanceStatus = 'empty' | 'pending' | 'accepted' | 'rejected' | 'error'

export type AcceptOrderEmptyState = {
  status: 'empty'
}

export type AcceptOrderLoadedState = {
  orderDetails: OrderDetails,
  status: 'pending' | 'rejected' | 'accepting'
}

export type AcceptOrderAcceptedState = {
  orderDetails: OrderDetails,
  link: string,
  status: 'accepted'
}

export type AcceptOrderErrorState = {
  message: string,
  status: 'error'
}

export type AcceptOrderState = AcceptOrderEmptyState | AcceptOrderLoadedState | AcceptOrderErrorState | AcceptOrderAcceptedState

const defaultState = {
  status: 'empty'
};

export function acceptOrderReducer (previousState : AcceptOrderState = defaultState, action : Action) : AcceptOrderState {
  switch (action.type) {
    case ACCEPT_ORDER_RESET: {
      return defaultState;
    }
    case ACCEPT_ORDER_LOAD_COMPLETE: {
      if (action.payload.orderDetails.link) {
        return {
          orderDetails: action.payload.orderDetails,
          link: action.payload.orderDetails.link,
          status: 'accepted'
        };
      } else {
        return {
          orderDetails: action.payload.orderDetails,
          status: 'pending'
        };
      }
    }
    case ACCEPT_ORDER_LOAD_ERROR: {
      return {
        status: 'error',
        message: action.payload.message
      };
    }
    case ORDER_ACCEPTED: {
      if (previousState.status === 'pending') {
        return ({
          ...previousState,
          status: 'accepting'
        } : AcceptOrderLoadedState);
      } else {
        return {
          status: 'error',
          message: 'Order not available'
        };
      }
    }
    case ORDER_REJECTED: {
      if (previousState.status === 'pending') {
        return ({
          ...previousState,
          status: 'rejected'
        } : AcceptOrderLoadedState);
      } else {
        return {
          status: 'error',
          message: 'Order not available'
        };
      }
    }
    case ORDER_ACCEPTED_COMPLETE: {
      if (previousState.status === 'accepting') {
        return ({
          orderDetails: previousState.orderDetails,
          link: action.payload.link,
          status: 'accepted'
        } : AcceptOrderAcceptedState);
      } else {
        return {
          status: 'error',
          message: 'Order not available'
        };
      }
    }
    default: {
      return previousState;
    }
  }
}
