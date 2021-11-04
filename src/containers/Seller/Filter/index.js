import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import ListProductByProType from "../../../components/Seller/ListProductByProType";
import * as productTypeActions from "./../../../actions/productType";
import { onAddToCart } from './../../../helpers/cartHelper';

class Filter extends Component {

  reloadData = () => {
    let url = window.location.href;
    let myArr = url.split("/");
    let proType = myArr[myArr.length - 1];
    const { productActionCreators } = this.props;
    const { fetchListProductByProType } = productActionCreators;
    fetchListProductByProType(parseInt(proType));
    const { productTypeActionCreators } = this.props;
    const { findProductType } = productTypeActionCreators;
    findProductType(parseInt(proType))
  }

  render() {
    this.reloadData();
    let { listProductSell, productType } = this.props;
    return (
      <>
        <ListProductByProType
          key={1}
          products={listProductSell}
          productType={productType}
        />
      </>
    );
  }
}

Filter.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(Filter)
);
