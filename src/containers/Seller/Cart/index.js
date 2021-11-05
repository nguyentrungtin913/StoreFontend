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
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
    const { classes } = this.props;
    let { name, phone } = this.state;
    let xhtml = null;
    xhtml = (

      <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={this.onSave} >
          <DialogTitle >
            <h1>Thông tin khách hàng</h1>
          </DialogTitle>
          <DialogContent>
            <h2 className={`${classes.label}`}>Họ Tên</h2>
            <input
              type="text"
              name='name'
              className={`form-control ${classes.textBox}`}
              value={name}
              onChange={this.onChange}
              required="required"
            />
            <h2 className={`${classes.label}`}>Số điện thoại</h2>
            <input
              type="text"
              name="phone"
              className={`form-control ${classes.textBox}`}
              value={phone}
              onChange={this.onChange}
              required="required"
            />
          </DialogContent>
          <DialogActions>
            <button onClick={this.handleClose} className={`btn btn-lg btn-warning ${classes.button}`}>Hủy</button>
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
