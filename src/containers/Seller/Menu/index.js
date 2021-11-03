/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productTypeActions from "./../../../actions/productType";
import styles from "./styles";
import { NavLink } from "react-router-dom";
class Menu extends Component {

  componentDidMount() {
    const { productTypeActionCreators } = this.props;
    const { fetchListProductType } = productTypeActionCreators;
    fetchListProductType();
  }
  renderMenu = () => {
    let xhtml = null;
    const { classes, listProductType } = this.props;
    xhtml = listProductType.map((proType) => {
      return <>
        <NavLink
          key={'/product/' + proType.id}
          to={'/product/' + proType.id}
          exact={true}
          className={classes.items}
          activeClassName={classes.menuLinkActive}
        >
          {proType.name}
        </NavLink>
      </>
    });
    return xhtml;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={`dropdown-menu ${classes.menu}`} aria-labelledby="dropdownMenuButton">
        {this.renderMenu()}
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object,
  productTypeActionCreators: PropTypes.shape({
    fetchListProductType: PropTypes.func
  }),
  listProductType: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProductType: state.productType.listProductType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Menu)
);
