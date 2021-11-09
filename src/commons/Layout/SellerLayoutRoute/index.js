import PropTypes from "prop-types";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import Board from "./../../../components/Board";
class SellerLayoutRoute extends Component {
  render() {
    const { component: YourComponent, ...remainProps } = this.props;
    return (
      <Route
        {...remainProps}
        render={routeProps => {
          return (
            <Board {...remainProps}>
              <YourComponent {...routeProps} />
            </Board>
          );
        }}
      />
    );
  }
}

SellerLayoutRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string
};

export default SellerLayoutRoute;
