import React from "react";
import { Route } from "react-router-dom";

function PublicLayoutRoute(props) {
  const { component: YourComponent, ...remainProps } = props;

  const renderComponent = (routeProps) => {
    return <YourComponent {...routeProps} />;
  };

  return <Route {...remainProps} render={renderComponent}></Route>;
}

PublicLayoutRoute.defaultProps = {};

PublicLayoutRoute.propTypes = {};

export default PublicLayoutRoute;
