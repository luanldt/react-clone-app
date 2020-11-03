import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateLayoutRoute(props) {
  const { authed, component: YourComponent, ...remainProps } = props;
  const renderComponent = (routeProps) => {
    if (authed) {
      return <YourComponent {...routeProps} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return <Route {...remainProps} render={renderComponent}></Route>;
}

export default PrivateLayoutRoute;
