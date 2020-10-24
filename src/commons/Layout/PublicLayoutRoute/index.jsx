import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class PublicLayoutRoute extends Component {
  renderComponent = (routeProps) => {
    const { component: YourComponent, ...remainProps } = this.props;
    return <YourComponent {...routeProps} {...remainProps} />;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { component, ...remainProps } = this.props;
    return <Route {...remainProps} render={this.renderComponent} />;
  }
}

PublicLayoutRoute.propTypes = {
  component: PropTypes.object,
};

export default PublicLayoutRoute;
