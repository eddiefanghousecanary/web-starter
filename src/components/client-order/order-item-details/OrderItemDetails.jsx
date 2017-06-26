import React from 'react';
import { IconButton } from 'react-toolbox/lib/button';

import type { OrderItem } from '../../../actions/order.actions';

import styles from './order-item-details.css';

const DataItem = ({
  data,
  subData,
  label
}: {
  data: string,
  subData?: string,
  label: string
}) => {
  return <div className={styles.dataContainer}>
    <div>{data}</div>
    <div className={styles.subData}>{subData}</div>
    <div className={styles.label}>{label}</div>
  </div>;
};

type OrderItemDetailsProps = {
  orderItem: OrderItem,
  onClose: () => void
}

const OrderItemDetails = ({
  orderItem,
  onClose
}: OrderItemDetailsProps) => {
  return <div className={styles.content}>
    <div className={styles.titleCloseContainer}>
      <h3>Detail Info</h3>
      <IconButton icon='close' onClick={onClose} />
    </div>
    <DataItem
      data={`${orderItem.address} ${orderItem.unit}`}
      subData={`${orderItem.city}, ${orderItem.state} ${orderItem.zipcode}`}
      label='Address' />
    <DataItem
      data={orderItem.customerItemId}
      label='ID' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='Property Type' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='AVM' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='Appraisal' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='% Diff' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='Rural' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='Inspection Data' />
    <DataItem
      data='¯\_(ツ)_/¯'
      label='Appraisal Date' />
  </div>;
};

export default OrderItemDetails;
