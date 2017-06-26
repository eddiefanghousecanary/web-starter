// @flow
import React from 'react';
import {Card, CardText} from 'react-toolbox/lib/card';

const OrderAccepted = ({link} : {link:string}) => (
  <Card raised>
    <CardText>
      <div>
        Order Accepted
      </div>
      <div>
        <a href={link}>Click here to get started</a>
      </div>
    </CardText>
  </Card>
);

export default OrderAccepted;
