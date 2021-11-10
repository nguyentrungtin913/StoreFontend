/* eslint-disable no-useless-concat */
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import ListProduct from "../../../components/Seller/ListProduct";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import * as productTypeActions from "./../../../actions/productType";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProductCustomer } = productActionCreators;

    const { productTypeActionCreators } = this.props;
    const { fetchListProductTypeByRating } = productTypeActionCreators;

    fetchListProductTypeByRating();
    fetchListProductCustomer();
  }

  render() {
    let { listProduct, listProductTypeByRating } = this.props;
    listProduct = listProduct.filter(item => item.amount > 0);
    return (
      <>
        <ListProduct
          key={listProduct.length}
          products={listProduct}
          productTypes={listProductTypeByRating}
        />
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func
  }),
  listProduc: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
    listProductTypeByRating: state.productType.listProductTypeByRating,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch),
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
