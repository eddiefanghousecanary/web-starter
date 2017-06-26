// @flow
/* globals Generator */
import type { ViewTypes } from './actions/view.actions';

import { loadAcceptOrderDetailsSaga } from './sagas/accept-order.saga';
import { loadClientDashboardSaga, loadOrderItems } from './sagas/client-dashboard.saga';
import AcceptOrder from './containers/AcceptOrder';
import ClientDashboard from './containers/client-dashboard/ClientDashboard';
import ClientOrder from './containers/client-order/ClientOrder';

type ViewDefinition = {
  id: ViewTypes,
  saga: ({[key: string]: any}) => Generator<*, *, *>,
  view: any,
  requiresLogin: boolean
}

export const ROUTES : {[key : string]: ViewDefinition} = {
  '/partner/accept-evaluation-order/:orderId': {
    id: 'accept-evaluation-order',
    saga: loadAcceptOrderDetailsSaga,
    view: AcceptOrder,
    requiresLogin: true
  },
  '/client/dashboard/:orderSet?/:page?': {
    id: 'client-dashboard',
    saga: loadClientDashboardSaga,
    view: ClientDashboard,
    requiresLogin: true
  },
  '/client/order/:orderId/:page?': {
    id: 'client-order',
    saga: loadOrderItems,
    view: ClientOrder,
    requiresLogin: true
  }
};
