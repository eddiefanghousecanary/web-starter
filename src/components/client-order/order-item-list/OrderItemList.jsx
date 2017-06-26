// @flow
import React from 'react';
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';
import {IconMenu, MenuItem} from 'react-toolbox';

import type { routeGeneratorFn } from '../../pagination/Pagination';
import type { OrderItem, Links } from '../../../actions/order.actions';

import Pagination from '../../pagination/Pagination';

import styles from './order-item-list.css';

export type OrderItemListProps = {
  orderItems: OrderItem[],
  links: Links,
  errorMessage: ?string,
  loading: bool,
  paginationRouteGeneratorFn: routeGeneratorFn,
  handleShowOrderItemDetails: OrderItem => void,
  handleShowOrderItemMessages: OrderItem => void,
  selectedOrderItem: ?OrderItem
}

const OrderItemList = ({
  orderItems,
  links,
  errorMessage,
  loading,
  paginationRouteGeneratorFn,
  handleShowOrderItemDetails,
  handleShowOrderItemMessages,
  selectedOrderItem
} : OrderItemListProps) => {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table
        selectable={false}
        multiSelectable={false}
      >
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Project Type</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>City</TableCell>
          <TableCell>State</TableCell>
          <TableCell>AVM</TableCell>
          <TableCell>Appraiased</TableCell>
          <TableCell>% Diff</TableCell>
          <TableCell>Address Validation</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHead>
        {orderItems.map(orderItem => {
          const selectedClass = (selectedOrderItem && selectedOrderItem.id === orderItem.id) ? styles.selected : '';
          return <TableRow key={orderItem.id}
            onClick={() => handleShowOrderItemDetails(orderItem)}
            title='See Details'
            className={`${styles.row} ${selectedClass}`}>
            <TableCell>{orderItem.customerItemId}</TableCell>
            <TableCell>¯\_(ツ)_/¯</TableCell>
            <TableCell>{orderItem.address} {orderItem.unit}</TableCell>
            <TableCell>{orderItem.city}</TableCell>
            <TableCell>{orderItem.state}</TableCell>
            <TableCell>¯\_(ツ)_/¯</TableCell>
            <TableCell>¯\_(ツ)_/¯</TableCell>
            <TableCell>¯\_(ツ)_/¯</TableCell>
            <TableCell>{orderItem.addressValidationStatus}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <IconMenu icon='more_vert'>
                <MenuItem value='See Details' caption='See Details' onClick={() => handleShowOrderItemDetails(orderItem)} />
                <MenuItem value='Download Report' caption='Downlooad Report' />
                <MenuItem value='Message AMC' caption='Message AMC' onClick={() => handleShowOrderItemMessages(orderItem)} />
              </IconMenu>
            </TableCell>
          </TableRow>;
        })}
      </Table>
      <Pagination routeGeneratorFn={paginationRouteGeneratorFn} links={links} />
    </div>
  );
};

export default OrderItemList;
