import React from "react";
// import DashboardHome from "./root/DashboardHome";
import { Route, Redirect } from "react-router-dom";
const SecuredRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        return auth ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};
export default SecuredRoute;
