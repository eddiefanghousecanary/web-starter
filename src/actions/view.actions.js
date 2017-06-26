// @flow
export const VIEW_LOADING = 'VIEW_LOADING';
export const VIEW_LOADED = 'VIEW_LOADED';

export type ViewTypes = 'accept-evaluation-order' | 'home' | 'client-dashboard' | 'client-order';

export type ViewAction = {
  type : 'VIEW_LOADING' | 'VIEW_LOADED',
  payload: {
    view: ViewTypes
  }
}

export const viewLoading = (view : ViewTypes) : ViewAction => ({ type: VIEW_LOADING, payload: {view} });
export const viewLoaded = (view : ViewTypes) : ViewAction => ({ type: VIEW_LOADED, payload: {view} });
