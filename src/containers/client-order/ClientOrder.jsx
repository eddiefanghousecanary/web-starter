import React from 'react';
import { connect } from 'react-redux';
import { Layout, Panel, Sidebar } from 'react-toolbox';

import type { ClientDashboardState } from '../../reducers/client-dashboard.reducer';
import RoutingIconButton from '../../components/routing/RoutingIconButton';

import OrderItemList from '../../components/client-order/order-item-list/OrderItemList';
import OrderItemDetails from '../../components/client-order/order-item-details/OrderItemDetails';
import OrderItemMessages from '../../components/client-order/order-item-messages/OrderItemMessages';

import commonStyles from '../common.css';
import styles from './client-order.css';

type ClientOrderProps = {
  clientDashboardState: ClientDashboardState
}

function buildSidebarContents (sidebarContentsType, orderItem, handleCloseSidebar) {
  switch (sidebarContentsType) {
    case 'details':
      return <OrderItemDetails orderItem={orderItem} onClose={handleCloseSidebar} />;
    case 'messages':
      return <OrderItemMessages orderItem={orderItem} onClose={handleCloseSidebar} />;
    default:
      return null;
  }
}

class ClientOrder extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      orderItem: null,
      sidebarContentsType: null
    };
  }
  props: ClientOrderProps

  handleShowOrderItemDetails (orderItem) {
    this.setState({
      orderItem,
      sidebarContentsType: 'details'
    });
  }

  handleShowOrderItemMessages (orderItem) {
    this.setState({
      orderItem,
      sidebarContentsType: 'messages'
    });
  }

  handleCloseSidebar () {
    this.setState({
      orderItem: null,
      sidebarContentsType: null
    });
  }

  render () {
    const {
      clientDashboardState
    } = this.props;

    const paginationRouteGeneratorFn = (page) => (page) ? `/client/order/${clientDashboardState.selectedOrder.id}/${page}` : `/client/order/${clientDashboardState.selectedOrder.id}`;
    const dashboardRoute = `/client/dashboard/${clientDashboardState.orderSet}/${clientDashboardState[clientDashboardState.orderSet].page}`;

    return <Layout>
      <Panel>
        <div className={commonStyles.blueGradientBg}>
          <RoutingIconButton icon='arrow_back' to={dashboardRoute} />
        </div>
        <div className={commonStyles.panelContent}>
          <div className={commonStyles.clientHeader}>
            <span>Hello world</span>
          </div>
          <div className={commonStyles.listContainer}>
            <OrderItemList
              loading={clientDashboardState.selectedOrderItems.loading}
              errorMessage={clientDashboardState.selectedOrderItems.errorMessage}
              orderItems={clientDashboardState.selectedOrderItems.pageItems}
              links={clientDashboardState.selectedOrderItems.links}
              paginationRouteGeneratorFn={paginationRouteGeneratorFn}
              handleShowOrderItemDetails={this.handleShowOrderItemDetails.bind(this)}
              handleShowOrderItemMessages={this.handleShowOrderItemMessages.bind(this)}
              selectedOrderItem={this.state.orderItem}
            />
          </div>
        </div>
      </Panel>
      <Sidebar pinned={this.state.sidebarContentsType !== null} className={styles.sideBar}>
        {buildSidebarContents(this.state.sidebarContentsType, this.state.orderItem, this.handleCloseSidebar.bind(this))}
      </Sidebar>
    </Layout>;
  }
}

function mapStateToProps (state) {
  return { clientDashboardState: state.clientDashboard };
}

const ClientOrderWrapped = connect(mapStateToProps)(ClientOrder);
export default ClientOrderWrapped;
