// @flow
import type { Dispatch } from 'redux';
import type { AcceptOrderState } from '../reducers/accept-order.reducer';
import type { UserState } from '../reducers/user.reducer';

import React from 'react';
import { connect } from 'react-redux';

import SimpleLayout from '../layouts/simple';
import { acceptOrder, rejectOrder } from '../actions/accept-order.actions';
import OrderDetails from '../components/accept-order/OrderDetails';
import OrderAccepted from '../components/accept-order/OrderAccepted';
import OrderRejected from '../components/accept-order/OrderRejected';
import OrderError from '../components/accept-order/OrderError';

type AcceptOrderProps = {
  onAcceptOrder: (orderId: string, token: string) => void,
  onRejectOrder: () => void,
  orderState: AcceptOrderState,
  userState: UserState
}

const AcceptOrder = (props : AcceptOrderProps) => {
  const { orderState, userState, onAcceptOrder, onRejectOrder } = props;
  if (orderState.status === 'error') {
    return <OrderError message={orderState.message} />;
  } else if (orderState.status === 'empty') {
    return <div />;
  } else if (orderState.status === 'accepted') {
    return <OrderAccepted link={orderState.link} />;
  } else if (orderState.status === 'rejected') {
    return <OrderRejected />;
  } else {
    if (userState.userDetails == null) {
      return <div />;
    }
    return <OrderDetails {...{orderState, userDetails: userState.userDetails, onAcceptOrder, onRejectOrder}} />;
  }
};

function mapStateToProps (state) {
  return { orderState: state.acceptOrder, userState: state.user };
}

function mapDispatchToProps (dispatch : Dispatch<*>) {
  return {
    onAcceptOrder: (orderId, token) => dispatch(acceptOrder(orderId, token)),
    onRejectOrder: () => dispatch(rejectOrder())
  };
}

const AcceptOrderWrapped = connect(mapStateToProps, mapDispatchToProps)(SimpleLayout(AcceptOrder));

export default AcceptOrderWrapped;
