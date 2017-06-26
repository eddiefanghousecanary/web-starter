import React from 'react';

import type { Links } from '../../actions/order.actions';
import RoutingIconButton from '../routing/RoutingIconButton';

export type routeGeneratorFn = (page: ?number) => string;

export type PaginationProps = {
  routeGeneratorFn: (page: ?number) => string,
  links: Links
}

const Pagination = ({routeGeneratorFn, links} : PaginationProps) => {
  return (!links.prev && !links.next) ? null : (<div>
    <RoutingIconButton icon='first_page' to={routeGeneratorFn(1)} disabled={!links.prev} />
    <RoutingIconButton icon='chevron_left' to={routeGeneratorFn(links.prev && links.prev.page)} disabled={!links.prev} />
    <RoutingIconButton icon='chevron_right' to={routeGeneratorFn(links.next && links.next.page)} disabled={!links.next} />
    <RoutingIconButton icon='last_page' to={routeGeneratorFn(links.last.page)} disabled={!links.next} />
  </div>);
};

export default Pagination;
