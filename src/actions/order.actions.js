// @flow
import type { OrderSet } from '../constants/order-sets';

export const SHOW_ADD_ORDER_DIALOG = 'SHOW_ADD_ORDER_DIALOG';
export const HIDE_ADD_ORDER_DIALOG = 'HIDE_ADD_ORDER_DIALOG';
export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const HIDE_ORDER_TOAST = 'HIDE_ORDER_TOAST';
export const ORDERS_LOAD_SUCCESS = 'ORDERS_LOAD_SUCCESS';
export const ORDERS_LOAD_ERROR = 'ORDERS_LOAD_ERROR';
export const SELECT_ORDER = 'SELECT_ORDER';
export const REVIEW_ORDER_UPDATED = 'REVIEW_ORDER_UPDATED';

export type ShowAddOrderDialogAction = {
  type: 'SHOW_ADD_ORDER_DIALOG'
}

export type HideAddOrderDialogAction = {
  type: 'HIDE_ADD_ORDER_DIALOG'
}

export type CreateOrder = {
  orderFile: any,
  customerOrderId: string,
  name: string,
  orderType: string,
  inspectionPartner?: ?string,
  valuationPartner?: ?string,
  intendedUse?: ?string,
  specialComments?: ?string,
  clientName?: ?string,
  clientAddress?: ?string,
  clientCity?: ?string,
  clientState?: ?string,
  clientZipcode?: ?string,
  clientPhone?: ?string,
  lenderName?: ?string,
  lenderAddress?: ?string,
  lenderCity?: ?string,
  lenderState?: ?string,
  lenderZipcode?: ?string,
  lenderPhone?: ?string
}

export type CreateOrderAction = {
  type: 'CREATE_ORDER',
  payload: {
    orderDetails: CreateOrder
  }
}

export type CreateOrderErrorAction = {
  type: 'CREATE_ORDER_ERROR',
  payload: {
    errorMessage: string,
    validationErrors: ?{[key: string]: any}
  }
}

export type CreateOrderSuccessAction = {
  type: 'CREATE_ORDER_SUCCESS'
}

export type HideOrderToastAction = {
  type: 'HIDE_ORDER_TOAST'
}

export type Order = {
  id: string,
  customerOrderId: string,
  name: string,
  orderType: string,
  inspectionPartner: string,
  valuationPartner: string,
  status: string,
  intendedUse: ?string,
  specialComments: ?string,
  clientName: ?string,
  clientAddress: ?string,
  clientCity: ?string,
  clientState: ?string,
  clientZipcode: ?string,
  clientPhone: ?string,
  lenderName: ?string,
  lenderAddress: ?string,
  lenderCity: ?string,
  lenderState: ?string,
  lenderZipcode: ?string,
  lenderPhone: ?string
}

export type Link = {
  page: number,
  url: string
}

export type Links = {
  [key: string]: Link
}

export type OrdersLoadSuccessAction = {
  type: 'ORDERS_LOAD_SUCCESS',
  payload: {
    set: OrderSet,
    links: Links,
    orders: Order[],
    page: number
  }
}

export type OrdersLoadErrorAction = {
  type: 'ORDERS_LOAD_ERROR',
  payload: {
    set: OrderSet,
    errorMessage: string
  }
}

export type SelectOrderAction = {
  type: 'SELECT_ORDER',
  payload: {
    order: Order
  }
}

export type OrderItem = {
  id: string,
  customerItemId: string,
  address: string,
  unit: ?string,
  city: string,
  state: string,
  zipcode: string,
  status: string,
  addressValidationStatus: string
}

export type OrderAction = ShowAddOrderDialogAction
  | HideAddOrderDialogAction
  | CreateOrderAction
  | CreateOrderErrorAction
  | CreateOrderSuccessAction
  | HideOrderToastAction
  | OrdersLoadSuccessAction
  | OrdersLoadErrorAction
  | SelectOrderAction

export const showAddOrderDialog = () : OrderAction => ({ type: SHOW_ADD_ORDER_DIALOG });
export const hideAddOrderDialog = () : OrderAction => ({ type: HIDE_ADD_ORDER_DIALOG });
export const createOrder = (order: CreateOrder) : OrderAction => ({ type: CREATE_ORDER, payload: {orderDetails: order} });
export const createOrderError = (errorMessage: string, validationErrors: ?{[key: string]: any}) : OrderAction => ({ type: CREATE_ORDER_ERROR, payload: {errorMessage, validationErrors} });
export const createOrderSuccess = () : OrderAction => ({ type: CREATE_ORDER_SUCCESS, payload: {} });
export const hideOrderToast = () : OrderAction => ({ type: HIDE_ORDER_TOAST, payload: {} });
export const ordersLoadSuccess = (set: OrderSet, orders : Order[], links : {[key: string]: Link}, page : number) : OrderAction => ({ type: ORDERS_LOAD_SUCCESS, payload: {set, orders, links, page} });
export const ordersLoadError = (set: OrderSet, errorMessage : string) : OrderAction => ({ type: ORDERS_LOAD_ERROR, payload: {set, errorMessage} });
export const selectOrder = (order : Order) : OrderAction => ({ type: SELECT_ORDER, payload: {order} });
