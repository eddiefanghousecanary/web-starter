// @flow
import type { Action } from '../actions';
import type { ViewTypes } from '../actions/view.actions';
import { VIEW_LOADING, VIEW_LOADED } from '../actions/view.actions';

type ViewState = {
  currentView: ViewTypes,
  loading: boolean
}

const defaultState = {
  currentView: 'home',
  loading: true
};

export function viewReducer (previousState : ViewState = defaultState, action : Action) : ViewState {
  switch (action.type) {
    case VIEW_LOADING: {
      return {
        currentView: action.payload.view,
        loading: true
      };
    }
    case VIEW_LOADED: {
      return {
        currentView: action.payload.view,
        loading: false
      };
    }
    default: {
      return previousState;
    }
  }
}
