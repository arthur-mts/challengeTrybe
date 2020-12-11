import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "pages/Login";
import EditCurrency from "pages/EditCurrency";
import { useAuth } from "hooks/auth";
import Currencies from "pages/Currencies";

const Routes: React.FC = () => {
  const { token } = useAuth();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={({ location }) =>
          token ? (
            <Currencies />
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
      <Route
        path="/editCurrency"
        render={({ location }) =>
          token ? (
            <EditCurrency />
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
      <Route path="/login" render={() => <Login />} />
    </Switch>
  );
};

export default Routes;
