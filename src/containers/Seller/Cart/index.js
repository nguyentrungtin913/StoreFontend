import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import CartList from "../../../components/Seller/Cart";
import * as productTypeActions from "./../../../actions/productType";

class Cart extends Component {

  reloadData = () => {
  }

  render() {
    this.reloadData();
    let { listProductSell, productType } = this.props;
    return (
      <>
        <CartList
          key={1}
          products={listProductSell}
          productType={productType}
        />
      </>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    listProductSell: state.product.listProductSell,
    productType: state.productType.productType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch),
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
