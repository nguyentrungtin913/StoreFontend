import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { bindActionCreators } from "redux";
import * as productActions from "./../../../actions/product";
import CartList from "../../../components/Seller/Cart";
import * as productTypeActions from "./../../../actions/productType";
import { getCookie } from './../../../helpers/storeCookie';
import { cartRemove, setAmount } from "../../../helpers/cartHelper";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      phone: '',

    }
  }

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

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  onSave = e => {
    this.handleClose();
    e.preventDefault();
    let listProductCart = getCookie(
      "Cart"
    );
    let { name, phone } = this.state;
    let params = null;
    if (listProductCart) {
      params = {
        arr: JSON.parse(listProductCart),
        name: name,
        phone: phone
      }
    }

    const { productActionCreators } = this.props;
    const { customerBuy } = productActionCreators;
    customerBuy(params);
  }
  handleClose = (value) => {
    this.setState({
      open: false
    });
  };
  renderDialog() {
    const { classes, listCart } = this.props;
    let { name, phone } = this.state;
    let xhtml = null;
    let total = 0;
    listCart.forEach(e => {
      total += (e.priceExport * parseInt(e.amountSell));
    });
    total = new Intl.NumberFormat("de-DE").format(total);
    xhtml = (
      <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={this.onSave} >
          <DialogTitle >
            <h1>Th??ng tin kh??ch h??ng</h1>
          </DialogTitle>
          <DialogContent>
            <h2 className={`${classes.label}`}>H??? T??n</h2>
            <input
              type="text"
              name='name'
              className={`form-control ${classes.textBox}`}
              value={name}
              onChange={this.onChange}
              required="required"
            />
            <h2 className={`${classes.label}`}>S??? ??i???n tho???i</h2>
            <input
              type="text"
              name="phone"
              className={`form-control ${classes.textBox}`}
              value={phone}
              onChange={this.onChange}
              required="required"
            />
            <h2 className={`${classes.label}`}>S??? l?????ng m???t h??ng</h2>
            <input
              type="text"
              className={`form-control ${classes.textBox}`}
              value={listCart.length}
            />
            <h2 className={`${classes.label}`}>T???ng ti???n</h2>
            <input
              type="text"
              className={`form-control ${classes.textBox}`}
              value={total}
            />
          </DialogContent>
          <DialogActions>
            <button onClick={this.handleClose} className={`btn btn-lg btn-warning ${classes.button}`}>H???y</button>
            <button type="submit" className={`btn btn-lg btn-success ${classes.button}`}>Mua</button>
          </DialogActions>
        </form>
      </Dialog>

    )
    return xhtml;
  }

  onCartRemove = id => {
    cartRemove(id);
  }
  onUpAmountProduct = (id, amountSell) => {
    setAmount(id, amountSell);
  }
  onDownAmountProduct = (id, amountSell) => {
    setAmount(id, amountSell);
  }
  onStepAmountProduct = (id, amountSell) => {
    setAmount(id, amountSell);
  }
  onBuy = () => {
    this.handleClickOpen();
  }
  render() {
    this.componentDidMount();
    let { listCart } = this.props;
    return (
      <>
        {this.renderDialog()}
        <CartList
          key={1}
          products={listCart}
          onCartRemove={this.onCartRemove}
          onUpAmountProduct={this.onUpAmountProduct}
          onDownAmountProduct={this.onDownAmountProduct}
          onStepAmountProduct={this.onStepAmountProduct}
          onBuy={this.onBuy}
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
