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
    const { fetchListProduct } = productActionCreators;

    const { productTypeActionCreators } = this.props;
    const { fetchListProductTypeByRating } = productTypeActionCreators;

    fetchListProductTypeByRating();
    fetchListProduct();
  }

  render() {
    let { listProduct, listProductTypeByRating } = this.props;
    return (
      <>
        <ListProduct
          key={10}
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