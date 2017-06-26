export type OrderSet = 'activeOrders' | 'completedOrders'
type ORDER_SETS_TYPE = { [key: string]: OrderSet };

export const ORDER_SETS: ORDER_SETS_TYPE = {
  ACTIVE: 'activeOrders',
  COMPLETED: 'completedOrders'
};

export const ORDER_SET_TO_STATUSES = {
  [ORDER_SETS.ACTIVE]: ['Accepted', 'ClientReview'],
  [ORDER_SETS.COMPLETED]: 'Completed'
};
