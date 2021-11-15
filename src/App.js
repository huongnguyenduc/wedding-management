import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import { withStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import clsx from "clsx";
const styles = {
  base: {
    fontSize: 16,
  },
};

const App = ({ classes, className }) => {
  return (
    <>
      <SnackbarProvider maxSnack={3} className={clsx(classes.base, className)}>
        <Router>
          <Navbar />
          {showContentMenus(routes)}
        </Router>
      </SnackbarProvider>
    </>
  );
};
const showContentMenus = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      );
    });
  }
  return <Switch>{result}</Switch>;
};
export default withStyles(styles)(App);
