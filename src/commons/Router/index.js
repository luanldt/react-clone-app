import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../contants';
import PrivateLayoutRoute from '../Layout/PrivateLayoutRoute';
import PublicLayoutRoute from '../Layout/PublicLayoutRoute';
import PropTypes from 'prop-types';

class AppRouter extends Component {
  renderPublicRoute() {
    let xhtml = null;
    xhtml = PUBLIC_ROUTES.map((route) => (
      <PublicLayoutRoute
        key={route.path}
        name={route.name}
        component={route.component}
        path={route.path}
        exact={route.exact}
      />
    ));
    return xhtml;
  }

  renderPrivateRoute() {
    const { authed } = this.props;
    let xhtml = null;
    xhtml = PRIVATE_ROUTES.map((route) => (
      <PrivateLayoutRoute
        key={route.path}
        name={route.name}
        component={route.component}
        path={route.path}
        exact={route.exact}
        authed={authed}
      />
    ));
    return xhtml;
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {this.renderPrivateRoute()}
            {this.renderPublicRoute()}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  authed: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const mapDispatchToProps = (dispatch, props) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(AppRouter);
