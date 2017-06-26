import React from 'react';
import { IconButton } from 'react-toolbox/lib/button';

import type { OrderItem } from '../../../actions/order.actions';

import styles from './order-item-messages.css';

const OrderItemMessage = ({
  orderItem,
  onClose
}: {
  orderItem: OrderItem,
  onClose: () => void
}) => {
  return <div className={styles.content}>
    <div className={styles.titleCloseContainer}>
      <h3>AMC Company Name</h3>
      <IconButton icon='close' onClick={onClose} />
    </div>
  </div>;
};

export default OrderItemMessage;
