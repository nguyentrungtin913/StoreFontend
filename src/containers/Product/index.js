import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from "../../components/ProductList";
import * as productActions from "./../../actions/product";
import styles from "./styles";
import ProductActionPage from "../ProductActionPage";
import _ from "lodash";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      keyword: "",
      filter: 0
    };
  }
  onShowForm = () => {
    const { productActionCreators } = this.props;
    const { openForm } = productActionCreators;
    openForm("add");
    this.setState({
      add: true
    });
  };
  onCloseForm = () => {
    this.setState({
      add: false
    });
  };

  onClickEdit = product => {
    const { productActionCreators } = this.props;
    const { setProductEditing, openForm } = productActionCreators;
    setProductEditing(product);
    openForm();
    this.setState({
      add: true
    });

  }

  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct } = productActionCreators;
    fetchListProduct();
  }

  showDeleteProduct = product => {
    const { name, id } = product;
    if (confirm(`Bạn có muốn xóa sản phẩm \` ${name} \` không ?`)) { //eslint-disable-line
      const { productActionCreators } = this.props;
      const { deleteProduct } = productActionCreators;
      deleteProduct(id);
    }
  };
  onFind = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  onfilterList = type => {
    this.setState({
      filter: type
    });
  };
  renderList() {
    let { listProduct, productEditting } = this.props;
    let { add, keyword, filter } = this.state;
    let xhtmlList,
      xhtmlAdd = null;
    let listProductChoose = [];

    if (add) {
      xhtmlAdd = <ProductActionPage
        productEditting={productEditting}
        onCloseForm={this.onCloseForm}
      />;
      return xhtmlAdd;
    }

    if (keyword) {
      listProduct = _.filter(listProduct, function (product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    if (filter !== 0) {
      if (filter === 1) {
        listProduct = _.filter(listProduct, function (product) {
          return product.amount === 0;
        });
      } else if (filter === 2) {
        listProduct = _.filter(listProduct, function (product) {
          return product.amount > 0;
        });
      }
    }
    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id={1} >
        <ProductList
          products={listProduct}
          productsChoose={listProductChoose}
          onClickDelete={this.showDeleteProduct}
          onShowForm={this.onShowForm}
          onFind={this.onFind}
          filterList={this.onfilterList}
          onClickEdit={this.onClickEdit}
        />
      </div >
    );

    return xhtmlList;
  }

  render() {
    return (
      this.renderList()
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func
  }),
  listProduc: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
    productEditting: state.product.productEditting
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
