// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Snackbar, FontIcon, Layout, Panel, AppBar } from 'react-toolbox';

import type { Dispatch } from 'redux';
import type { AddOrderState } from '../../reducers/add-order.reducer';
import type { ClientDashboardState } from '../../reducers/client-dashboard.reducer';
import type { Order, CreateOrder } from '../../actions/order.actions';

import { ORDER_SETS } from '../../constants/order-sets';
import RoutingButton from '../../components/routing/RoutingButton';
import HcHeader from '../../components/hc-header/HcHeader';
import routeTo from '../../history/route-to';
import {
  showAddOrderDialog,
  hideAddOrderDialog,
  createOrder,
  hideOrderToast,
  reviewAcceptOrder,
  reviewRejectOrder,
  selectOrder
} from '../../actions/order.actions';
import AddOrderButton from '../../components/client-dashboard/AddOrderButton';
import AddOrderForm from '../../components/client-dashboard/AddOrderForm';
import OrderList from '../../components/client-dashboard/order-list/OrderList';
import clientDashboardSelector from '../../selectors/client-dashboard.selector';

import styles from './client-dashboard.css';
import commonStyles from '../common.css';

type ClientDashboardProps = {
  addOrderState: AddOrderState,
  clientDashboardState: ClientDashboardState,
  handleHideAddOrderDialog: () => void,
  handleCreateOrder: () => void,
  handleHideOrderToast: () => void,
  handleSelectOrder: Order => void,
  handleAcceptOrder: string => void,
  handleRejectOrder: string => void,
}

const PAGES_CONFIG = [
  {
    label: 'In Progress',
    orderSet: ORDER_SETS.ACTIVE
  },
  {
    label: 'Completed',
    orderSet: ORDER_SETS.COMPLETED
  }
];

const AddOrderContainer = connect(() => ({}))((props : any) => (
  <AddOrderButton onClick={() => props.dispatch(showAddOrderDialog())} />
));

class ClientDashboard extends React.Component {
  props: ClientDashboardProps;
  form: any;

  render () {
    const {
      addOrderState,
      clientDashboardState,
      handleHideAddOrderDialog,
      handleCreateOrder,
      handleHideOrderToast,
      handleSelectOrder,
      handleAcceptOrder,
      handleRejectOrder
    } = this.props;
    const paginationRouteGeneratorFn = (page) => (page) ? `/client/dashboard/${clientDashboardState.orderSet}/${page}` : `/client/dashboard/${clientDashboardState.orderSet}`;
    return (
      <Layout>
        <AppBar fixed className={`${commonStyles.appBar} ${styles.appBar}`}>
          <HcHeader />
        </AppBar>
        <Panel>
          <div className={commonStyles.panelContent}>
            <div className={commonStyles.clientHeader}>
              <div>
                <h2><FontIcon value='insert_chart' /> Dashboard</h2>
                <div>
                  {
                    PAGES_CONFIG.map((pageConfig, index) => {
                      return <RoutingButton to={`/client/dashboard/${pageConfig.orderSet}`} label={pageConfig.label} key={pageConfig.orderSet} />;
                    })
                  }
                </div>
              </div>
              <AddOrderContainer />
            </div>
            <div className={commonStyles.listContainer}>
              <OrderList
                orders={clientDashboardState.activeOrders.pageItems}
                links={clientDashboardState.activeOrders.links}
                paginationRouteGeneratorFn={paginationRouteGeneratorFn}
                errorMessage={clientDashboardState.activeOrders.errorMessage}
                onSelectOrder={handleSelectOrder}
                updatingOrders={clientDashboardState.updatingOrders}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
                selectedOrder={clientDashboardState.selectedOrder}
                />
            </div>

            <Dialog
              title='Create Order'
              active={addOrderState.dialogVisible}
              onEscKeyDown={handleHideAddOrderDialog}
              actions={[
                { label: 'Cancel', onClick: handleHideAddOrderDialog },
                { label: 'Save', onClick: () => this.form.submit() }
              ]}
            >
              <AddOrderForm
                ref={instance => { this.form = instance; }}
                errorMessage={addOrderState.error}
                onCancel={handleHideAddOrderDialog}
                onCreateOrder={handleCreateOrder}
              />
            </Dialog>

            <Snackbar
              active={addOrderState.orderToastVisible}
              label='Order Created'
              timeout={4000}
              onTimeout={handleHideOrderToast}
            />
          </div>
        </Panel>
      </Layout>
    );
  }
}

function mapStateToProps (state) {
  return { addOrderState: state.addOrder, clientDashboardState: clientDashboardSelector(state) };
}

function mapDispatchToProps (dispatch : Dispatch<*>) {
  return {
    handleHideAddOrderDialog: () => dispatch(hideAddOrderDialog()),
    handleCreateOrder: (orderDetails : CreateOrder) => dispatch(createOrder(orderDetails)),
    handleHideOrderToast: () => dispatch(hideOrderToast()),
    handleSelectOrder: (order) => {
      dispatch(selectOrder(order));
      routeTo(`/client/order/${order.id}`);
    },
    handleAcceptOrder: (id) => dispatch(reviewAcceptOrder(id)),
    handleRejectOrder: (id) => dispatch(reviewRejectOrder(id))
  };
}

const ClientDashboardWrapped = connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);

export default ClientDashboardWrapped;
