import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from "../../components/ProductList";
import * as productActions from "./../../actions/product";
import styles from "./styles";
import _ from "lodash";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct, ListChoose } = productActionCreators;
    ListChoose();
    fetchListProduct();
  }

  onChoose = product => {
    const { productActionCreators } = this.props;
    const { chooseProduct } = productActionCreators;
    chooseProduct(product);
  };

  onCancel = id => {
    const { productActionCreators } = this.props;
    const { cancelProduct } = productActionCreators;
    cancelProduct(id);
  };

  onUp = id => {
    const { productActionCreators } = this.props;
    const { upProduct } = productActionCreators;
    let type = "sell";
    upProduct(id, type);
  };

  onDown = id => {
    const { productActionCreators } = this.props;
    const { downProduct } = productActionCreators;
    let type = "sell";
    downProduct(id, type);
  };

  totalPrice(products) {
    var result = 0;
    if (products.length > 0) {
      products.forEach(product => {
        result += product.priceExport * product.amountSell;
      });
    }
    result = result.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND"
    });
    return result;
  }

  onSell = name => {
    let order = this.props.listProductChoose;
    let params = {
      name: name,
      order: order
    };
    const { productActionCreators } = this.props;
    const { sell } = productActionCreators;
    sell(params);

    // this.props.sell(params);
  };
  onFind = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  renderList() {
    let { listProduct, listProductChoose } = this.props;
    let { keyword } = this.state;
    if (keyword) {
      listProduct = _.filter(listProduct, function(product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    let xhtml = null;
    xhtml = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ProductList
          products={listProduct}
          productsChoose={listProductChoose}
          filter={1}
          onFind={this.onFind}
          onChoose={this.onChoose}
          onCancel={this.onCancel}
          onUp={this.onUp}
          onDown={this.onDown}
          onSell={this.onSell}
          type="sell"
          totalPrice={this.totalPrice(listProductChoose)}
        />
      </div>
    );
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        {this.renderList()}
      </div>
    );
  }
}

Sell.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func
  }),
  listProduc: PropTypes.array,
  listProductChoose: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
    listProductChoose: state.productChoose.listProductChoose
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Sell)
);
