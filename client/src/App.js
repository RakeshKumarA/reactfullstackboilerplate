import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PageNotFound from "./screens/PageNotFound";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import CustomSnackBar from "./components/snackbar/CustomSnackBar";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <CustomSnackBar />
      <div className={classes.root}>
        <main>
          <Switch>
            <PublicRoute
              restricted={false}
              path="/"
              exact
              component={LoginScreen}
            />
            <PublicRoute
              restricted={false}
              path="/register"
              exact
              component={RegisterScreen}
            />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
