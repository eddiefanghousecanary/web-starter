// @flow
import type { Action } from '../actions';

import { reducer as formReducer, stopAsyncValidation } from 'redux-form';
import { SHOW_ADD_ORDER_DIALOG, HIDE_ADD_ORDER_DIALOG, CREATE_ORDER, CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS, HIDE_ORDER_TOAST } from '../actions/order.actions';

type Status = 'new' | 'loading' | 'error'

export type AddOrderState = {
  dialogVisible: boolean,
  orderToastVisible: boolean,
  error: ?string,
  status: Status,
  form: any
}

const defaultState = {
  dialogVisible: false,
  orderToastVisible: false,
  error: null,
  status: 'new',
  form: null
};

export function addOrderReducer (state : AddOrderState = defaultState, action : Action) : AddOrderState {
  switch (action.type) {
    case SHOW_ADD_ORDER_DIALOG: {
      return {
        ...state,
        dialogVisible: true
      };
    }
    case HIDE_ADD_ORDER_DIALOG: {
      return {
        ...state,
        dialogVisible: false,
        form: formReducer(undefined, action)
      };
    }
    case CREATE_ORDER: {
      return {
        ...state,
        error: null,
        status: 'loading'
      };
    }
    case CREATE_ORDER_ERROR: {
      let form = state.form;
      if (action.payload.validationErrors) {
        form = formReducer(form, stopAsyncValidation('AddOrderForm', action.payload.validationErrors));
      }
      return {
        ...state,
        form,
        status: 'error',
        error: action.payload.errorMessage
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        dialogVisible: false,
        orderToastVisible: true,
        form: formReducer(undefined, action)
      };
    }
    case HIDE_ORDER_TOAST: {
      return {
        ...state,
        orderToastVisible: false
      };
    }
    default: {
      return {
        ...state,
        form: formReducer(state.form, action)
      };
    }
  }
}
