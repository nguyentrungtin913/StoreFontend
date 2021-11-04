/* eslint-disable no-useless-concat */
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import ListAllProduct from "../../../components/Seller/ListAllProduct";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import _ from "lodash";

class ListAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct } = productActionCreators;
    fetchListProduct();
  }
  onFind = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  render() {
    let { listProduct } = this.props;
    let { keyword } = this.state;
    if (keyword) {
      listProduct = _.filter(listProduct, function (product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    return (
      <>
        <ListAllProduct
          key={10}
          products={listProduct}
          onFind={this.onFind}
        />
      </>
    );
  }
}

ListAll.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func
  }),
  listProduc: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ListAll)
);
