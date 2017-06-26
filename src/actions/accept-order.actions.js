// @flow
export const ACCEPT_ORDER_RESET = 'ACCEPT_ORDER_RESET';
export const ACCEPT_ORDER_LOAD_COMPLETE = 'ACCEPT_ORDER_LOAD_COMPLETE';
export const ACCEPT_ORDER_LOAD_ERROR = 'ACCEPT_ORDER_LOAD_ERROR';
export const ORDER_ACCEPTED = 'ORDER_ACCEPTED';
export const ORDER_ACCEPTED_COMPLETE = 'ORDER_ACCEPTED_COMPLETE';
export const ORDER_REJECTED = 'ORDER_REJECTED';

export type OrderDetails = {
  orderId: string,
  orderType: string,
  address: string,
  unit: ?string,
  city: string,
  state: string,
  zipcode: string,
  link?: string
}

export type AcceptOrderResetAction = {
  type: 'ACCEPT_ORDER_RESET'
}

export type AcceptOrderLoadCompleteAction = {
  type: 'ACCEPT_ORDER_LOAD_COMPLETE',
  payload: {
    orderDetails: OrderDetails
  }
}

export type AcceptOrderLoadErrorAction = {
  type: 'ACCEPT_ORDER_LOAD_ERROR',
  payload: {
    message: string
  }
}

export type AcceptOrderAcceptedAction = {
  type: 'ORDER_ACCEPTED',
  payload: {
    orderId: string,
    token: string
  }
}

export type AcceptOrderAcceptedCompleteAction = {
  type: 'ORDER_ACCEPTED_COMPLETE',
  payload: {
    link: string
  }
}

export type AcceptOrderRejectedAction = {
  type: 'ORDER_REJECTED'
}

export type AcceptOrderAction = AcceptOrderResetAction | AcceptOrderLoadCompleteAction | AcceptOrderLoadErrorAction | AcceptOrderAcceptedAction | AcceptOrderAcceptedCompleteAction | AcceptOrderRejectedAction

export const resetAcceptOrder = () : AcceptOrderAction => ({ type: ACCEPT_ORDER_RESET });
export const acceptOrderLoadComplete = (orderDetails : OrderDetails) : AcceptOrderAction => ({ type: ACCEPT_ORDER_LOAD_COMPLETE, payload: {orderDetails} });
export const acceptOrderLoadError = (message : string) : AcceptOrderAction => ({ type: ACCEPT_ORDER_LOAD_ERROR, payload: {message} });
export const acceptOrder = (orderId : string, token: string) : AcceptOrderAction => ({ type: ORDER_ACCEPTED, payload: {orderId, token} });
export const acceptOrderComplete = (link : string) : AcceptOrderAction => ({ type: ORDER_ACCEPTED_COMPLETE, payload: {link} });
export const rejectOrder = () : AcceptOrderAction => ({ type: ORDER_REJECTED });
