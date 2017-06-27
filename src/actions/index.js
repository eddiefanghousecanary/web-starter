// @flow
import type { ViewAction } from './view.actions';
import type { UserAction } from './user.actions';
import type { OrderAction } from './order.actions';

export type Action = ViewAction | UserAction | OrderAction;
