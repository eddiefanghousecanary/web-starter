import type { Order } from '../actions/order.actions';

import clientDashboardSelector from './client-dashboard.selector';

const selectedOrderSelector = (state) : Order => clientDashboardSelector(state).selectedOrder;
export default selectedOrderSelector;
