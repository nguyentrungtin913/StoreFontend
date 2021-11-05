import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "./../../actions/cart";
import styles from "./styles";
import CartList from "../../components/CartList";
import CartDeltailList from "../../components/CartDeltailList";
import * as productActions from "./../../actions/product";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
    };
  }
  componentDidMount() {
    const { cartActionsCreators } = this.props;
    const { fetchListCart } = cartActionsCreators;
    const { productActionCreators } = this.props;
    const { fetchListProductSoldOut } = productActionCreators;
    fetchListCart();
    fetchListProductSoldOut();
  }
  onDetail = (id) => {
    this.setState({
      showDetail: true
    });
    const { cartActionsCreators } = this.props;
    const { findCart } = cartActionsCreators;
    findCart(id);
  };
  showList = () => {
    this.setState({
      showDetail: false
    });
  }
  onUpdateStatus = (id, status) => {
    const { cartActionsCreators } = this.props;
    const { updateCartStatus } = cartActionsCreators;
    let params = {
      cartId: id,
      cartStatus: status
    }
    updateCartStatus(params);
    this.componentDidMount()
  }
  renderContent() {
    const { ListCart, ListCartDetail, listProductSoldOut } = this.props;
    let { showDetail } = this.state;
    let xhtml = null;
    if (showDetail) {
      xhtml = (
        <CartDeltailList
          cartDetails={ListCartDetail}
          onShowList={this.showList}
          productsSoldOut={listProductSoldOut}
        />
      )
    } else {
      xhtml = (
        <CartList
          carts={ListCart}
          onUpdateStatus={this.onUpdateStatus}
          onClickDetail={this.onDetail}
        />
      )
    }
    return xhtml;
  }
  render() {
    const { classes} = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    ListCart: state.cart.ListCart,
    ListCartDetail: state.cart.ListCartDetail,
    listProductSoldOut: state.product.listProductSoldOut
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cartActionsCreators: bindActionCreators(cartActions, dispatch),
    productActionCreators: bindActionCreators(productActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
