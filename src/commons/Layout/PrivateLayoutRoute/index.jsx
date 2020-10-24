import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard';

class PrivateLayoutRoute extends Component {
  renderComponent = (routeProps) => {
    const { component: YourComponent, authed, ...remainProps } = this.props;
    if (authed) {
      return (
        <Dashboard authed={authed} {...remainProps}>
          <YourComponent {...routeProps} />
        </Dashboard>
      );
    } else {
      return <Redirect to="/login" />;
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { component, ...remainProps } = this.props;
    return <Route {...remainProps} render={this.renderComponent} />;
  }
}

PrivateLayoutRoute.propTypes = {
  component: PropTypes.object,
  authed: PropTypes.bool,
};

export default PrivateLayoutRoute;
