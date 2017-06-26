import clientDashboardSelector from './client-dashboard.selector';
import orderSetSelector from './order-set.selector';

const currentOrderPageSelector = (state) : number => {
  const clientDashboard = clientDashboardSelector(state);
  const orderSet = orderSetSelector(state);
  return clientDashboard[orderSet].page;
};
export default currentOrderPageSelector;
