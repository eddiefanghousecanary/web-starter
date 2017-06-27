// @flow
import React from 'react';
import { Button, ProgressBar } from 'react-toolbox';
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';

import type { Order, Link } from '../../../actions/order.actions';
import type { routeGeneratorFn } from '../../pagination/Pagination';

import Pagination from '../../pagination/Pagination';

import styles from './order-list.css';

export type OrderListProps = {
  orders: Order[],
  links: {
    prev?: Link,
    next?: Link,
    last: Link
  },
  paginationRouteGeneratorFn: routeGeneratorFn,
  errorMessage: ?string,
  updatingOrders: string[],
  onSelectOrder: Order => void,
  selectedOrder: ?Order
}

function cancelAndCall (f) {
  return function (e) {
    e.stopPropagation();
    e.preventDefault();
    f();
  };
}

function buildActions (order, updatingOrders) {
  const disabled = updatingOrders.includes(order.id);
  switch (order.status) {
    case 'ClientReview':
      return <div>
        {disabled ? <ProgressBar type='circular' mode='indeterminate' multicolor /> : null}
      </div>;
    default:
      return null;
  }
}

const OrderList = ({
  orders,
  links,
  paginationRouteGeneratorFn,
  errorMessage,
  updatingOrders,
  onSelectOrder,
  selectedOrder
} : OrderListProps) => {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      <Table selectable={false}>
        <TableHead>
          <TableCell>Order</TableCell>
          <TableCell>Project Name</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>BD Passed</TableCell>
          <TableCell>Properties</TableCell>
          <TableCell>Rural</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>AVM</TableCell>
          <TableCell>Progress</TableCell>
          <TableCell>actions</TableCell>
        </TableHead>
        {
          orders.map(order => {
            const selectedClass = (selectedOrder && selectedOrder.id === order.id) ? styles.selected : '';
            return <TableRow key={order.id}
              onClick={() => onSelectOrder(order)}
              className={`${styles.row} ${selectedClass}`}
              title='View Order Items'
              selected={selectedOrder && selectedOrder.id === order.id}>
              <TableCell>{order.customerOrderId}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>¯\_(ツ)_/¯</TableCell>
              <TableCell>{buildActions(order, updatingOrders)}</TableCell>
            </TableRow>;
          })
        }
      </Table>
      <Pagination routeGeneratorFn={paginationRouteGeneratorFn} links={links} />
    </div>
  );
};

export default OrderList;
