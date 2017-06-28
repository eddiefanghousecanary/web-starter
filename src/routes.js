// @flow
/* globals Generator */
import type { ViewTypes } from './actions/view.actions';

import { loadClientDashboardSaga, loadOrderDetail } from './sagas/client-dashboard.saga';
import ClientDashboard from './containers/client-dashboard/ClientDashboard';
import ClientOrder from './containers/client-order/ClientOrder';

type ViewDefinition = {
  id: ViewTypes,
  saga: ({[key: string]: any}) => Generator<*, *, *>,
  view: any,
  requiresLogin: boolean
}

export const ROUTES : {[key : string]: ViewDefinition} = {
  '/client/dashboard/:orderSet?/:page?': {
    id: 'client-dashboard',
    saga: loadClientDashboardSaga,
    view: ClientDashboard,
    requiresLogin: true
  },
  '/client/order/:orderId/:page?': {
    id: 'client-order',
    saga: loadOrderDetail,
    view: ClientOrder,
    requiresLogin: true
  }
};
