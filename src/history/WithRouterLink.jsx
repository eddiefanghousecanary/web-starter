import React from 'react';

import routeTo from './route-to';

type WithRouterLinkProps = {
  activeClassName: ?string,
  className: ?string,
  to: string
}

const WithRouterLink = (Component) => class WithRouterLink extends React.Component {
  constructor (props: WithRouterLinkProps) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  onClick = (e) => {
    this.setState({ isActive: true });
    e.stopPropagation();
    e.preventDefault();
    routeTo(this.props.to);
    this.setState({ isActive: false });
  };

  render () {
    const { to, className, activeClassName, ...rest } = this.props;
    const _className = this.state.isActive ? `${className} ${activeClassName}` : className;

    return (
      <Component
        {...rest}
        href={to}
        className={_className}
        onClick={this.onClick}
      />
    );
  }
};

export default WithRouterLink;
