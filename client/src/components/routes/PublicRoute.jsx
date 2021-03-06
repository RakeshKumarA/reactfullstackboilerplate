import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        userInfo && Object.keys(userInfo).length !== 0 && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
