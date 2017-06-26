import type { OrderSet } from '../constants/order-sets';

import clientDashboardSelector from './client-dashboard.selector';

const orderSetSelector = (state) : OrderSet => clientDashboardSelector(state).orderSet;
export default orderSetSelector;
