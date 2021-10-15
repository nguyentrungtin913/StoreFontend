import { withStyles } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminLayoutRoute from "../../commons/Layout/AdminLayoutRoute";
import GlobalLoading from "../../components/GlobalLoading";
import Modal from "../../components/Modal";
import { ADMIN_ROUTES, ROUTES } from "../../constants";
import configureStore from "../../redux/configureStore";
import theme from "./../../commons/Theme";
import styles from "./styles.js";
import DefaultLayoutRoute from "../../commons/Layout/DefaultLayoutRoute";

const store = configureStore();

class App extends Component {
  renderAdminRoutes() {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map(route => {
      return (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }

  renderDefaultRoutes() {
    let xhtml = null;
    xhtml = ROUTES.map(route => {
      return (
        <DefaultLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.myBody}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ToastContainer />
              <GlobalLoading />
              <Modal />
              <Switch>
                {this.renderAdminRoutes()}
                {this.renderDefaultRoutes()}
              </Switch>
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
