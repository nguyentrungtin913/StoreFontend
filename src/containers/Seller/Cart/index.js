import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import CartList from "../../../components/Seller/Cart";
import * as productTypeActions from "./../../../actions/productType";
import { mergeArrays, getCookie } from './../../../helpers/storeCookie';
import { toastSuccess, toastWarning } from './../../../helpers/toastHelper';

class Cart extends Component {

  componentDidMount() {
    let listProductCart = getCookie(
      "Cart"
    );
    if (listProductCart) {
      let params = {
        arr: JSON.parse(listProductCart)
      }
      const { productActionCreators } = this.props;
      const { fetchListProductById } = productActionCreators;
      fetchListProductById(params);
    }

  }

  reloadData = () => {

  }

  render() {
    this.reloadData();
    let { listCart } = this.props;
    return (
      <>
        <CartList
          key={1}
          products={listCart}
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
    listCart: state.product.listCart,
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
