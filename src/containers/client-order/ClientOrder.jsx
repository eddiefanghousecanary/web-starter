import React from 'react';
import { connect } from 'react-redux';
import { Layout, Panel, Sidebar } from 'react-toolbox';

import type { ClientDashboardState } from '../../reducers/client-dashboard.reducer';
import RoutingIconButton from '../../components/routing/RoutingIconButton';

import commonStyles from '../common.css';
import styles from './client-order.css';

type ClientOrderProps = {
  clientDashboardState: ClientDashboardState
}

class ClientOrder extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sidebarContentsType: null
    };
  }
  props: ClientOrderProps

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
            <span>{clientDashboardState.selectedOrder.name}</span>
          </div>
        </div>
      </Panel>
    </Layout>;
  }
}

function mapStateToProps (state) {
  return { clientDashboardState: state.clientDashboard };
}

const ClientOrderWrapped = connect(mapStateToProps)(ClientOrder);
export default ClientOrderWrapped;
