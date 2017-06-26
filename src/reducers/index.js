import { combineReducers } from 'redux';

import { viewReducer } from './view.reducer';
import { acceptOrderReducer } from './accept-order.reducer';
import { userReducer } from './user.reducer';
import { addOrderReducer } from './add-order.reducer';
import { clientDashboardReducer } from './client-dashboard.reducer';

const rootReducer = combineReducers({
  view: viewReducer,
  acceptOrder: acceptOrderReducer,
  user: userReducer,
  addOrder: addOrderReducer,
  clientDashboard: clientDashboardReducer
});

export default rootReducer;
