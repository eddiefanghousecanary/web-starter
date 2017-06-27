// @flow
import type { UserDetails } from '../../actions/user.actions';

import React from 'react';
import {Card, CardText, CardTitle, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

import type { AcceptOrderLoadedState } from '../../reducers/accept-order.reducer';

type OrderDetailsProps = {
  orderState: AcceptOrderLoadedState,
  userDetails: UserDetails
}

const OrderDetails = ({orderState, userDetails} : OrderDetailsProps) => (
  <Card raised>
    <CardTitle
      title='Accept Order'
      subtitle={`Accepting order as ${userDetails.firstName} ${userDetails.lastName} (${userDetails.email}) in organization ${userDetails.orgName}`} />
    <CardText>
      <div>
        <span>Order Type:</span> <span>{orderState.orderDetails.orderType}</span>
      </div>
      <div>
        <span>Address:</span> <span>{orderState.orderDetails.address} {orderState.orderDetails.unit}</span>
      </div>
      <div>
        <span>City:</span> <span>{orderState.orderDetails.city}</span>
      </div>
      <div>
        <span>State:</span> <span>{orderState.orderDetails.state}</span>
      </div>
      <div>
        <span>Zipcode:</span> <span>{orderState.orderDetails.zipcode}</span>
      </div>
    </CardText>
    <CardText>
      <div>If you do not wish to accept this order, please close this page and contact the AMC so the order can be reassigned.</div>
    </CardText>
    <CardActions>
      {orderState.status === 'accepting'
      ? <Button onClick={() => {}} disabled>Accepting...</Button>
      : <Button>Accept</Button>}
    </CardActions>
  </Card>
);

export default OrderDetails;
