// @flow
import React from 'react';
import {Card, CardText} from 'react-toolbox/lib/card';

type OrderErrorProps = {
  message: string
}

const OrderError = ({message} : OrderErrorProps) => (
  <Card raised>
    <CardText>{message}</CardText>
  </Card>
);

export default OrderError;
