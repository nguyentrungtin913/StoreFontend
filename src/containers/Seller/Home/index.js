import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import ListProduct from "../../../components/Seller/ListProduct";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import * as productTypeActions from "./../../../actions/productType";
import { mergeArrays, getCookie } from './../../../helpers/storeCookie';
import { toastSuccess, toastWarning } from './../../../helpers/toastHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onAddToCart = product => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    let cart = getCookie(
      "Cart"
    );


    let { id } = product;
    let pass = 1;
    let arr1 = [id]
    let arr2 = [1];
    let arr = mergeArrays(arr1, arr2);

    if (cart) {
      cart = JSON.parse(cart);
      cart.forEach(value => {
        let myArr = value.split(":");
        console.log(myArr[0], id)
        if (parseInt(myArr[0]) === id) {
          pass = 0;
        }
      });
      if (pass === 1) {
        cart.push(arr[0]);
        toastSuccess("Thêm vào giỏ hàng thành công !")
      }else{
        toastWarning("Sản phẩm đã tồn tại trong giỏ hàng !")
      }
    } else {
      cart = arr;
      toastSuccess("Thêm vào giỏ hàng thành công !")
    }
    document.cookie =
      "Cart" + "=" + JSON.stringify(cart) + ";" + expires + ";path=/";
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
          onAddToCart={this.onAddToCart}
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
