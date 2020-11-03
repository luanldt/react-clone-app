import React, { Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../contants";
import PrivateLayoutRoute from "../Layout/PrivateLayoutRoute";
import PublicLayoutRoute from "../Layout/PublicLayoutRoute";
import PropTypes from "prop-types";

const renderPublicRoute = () => {
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
};

const renderPrivateRoute = (authed) => {
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
};

function AppRouter(props) {
  const { authed } = props;
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          {renderPublicRoute()}
          {renderPrivateRoute(authed)}
        </Switch>
      </Suspense>
    </Router>
  );
}

AppRouter.propTypes = {
  authed: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const withConnect = connect(mapStateToProps, null);

export default withConnect(AppRouter);
