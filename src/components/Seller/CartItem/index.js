import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../../constants";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toastWarning } from './../../../helpers/toastHelper';


class CartItem extends Component {
  onCartRemove = (id) => {
    this.props.onCartRemove(id);
  }
  onStepAmountProduct = (id, amountSell, amount) => {
    console.log(id, amountSell, amount)
    amountSell = parseInt(amountSell) + 5;
    if (amountSell <= amount) {
      this.props.onStepAmountProduct(id, amountSell);
    } else {
      this.props.onStepAmountProduct(id, amount);
      toastWarning('Sản phẩm đã đạt giá trị tối đa !');
    }
  }

  onUpAmountProduct = (id, amountSell, amount) => {
    console.log(id, amountSell, amount)
    amountSell = parseInt(amountSell) + 1;
    if (amountSell <= amount) {
      this.props.onUpAmountProduct(id, amountSell);
    } else {
      toastWarning('Sản phẩm đã đạt giá trị tối đa !');
    }
  }

  onDownAmountProduct = (id, amountSell, amount) => {
    console.log(id, amountSell, amount)
    amountSell = parseInt(amountSell) - 1;
    if (amountSell > 0) {
      this.props.onDownAmountProduct(id, amountSell);
    } else {
      toastWarning('Sản phẩm đã đạt giá trị tối thiểu !');
    }
  }

  render() {
    let { product, classes } = this.props;
    let priceExport = new Intl.NumberFormat("de-DE").format(
      product.priceExport
    );
    return (
      <div className="col-md-6 col-lg-4">
        <div className={`box ${classes.borderBox}`} >
          <div className="img-box">
            <LazyLoadImage
              className={classes.imageProduct}
              src={`${API_URL}/image/${product.image}`}
              alt="" />
          </div>
          <div className="detail-box">
            <h2>{product.name}</h2>
            <div className="price_box">
              <span className={classes.amount}>
                <button className={classes.button} onClick={() => this.onDownAmountProduct(product.id, product.amountSell, product.amount)}>
                  <i className="fas fa-caret-left fa-3x"></i>
                </button>
                <h3 style={{ display: 'inline' }}>
                  {product.amountSell}
                </h3>
                <button className={classes.button} onClick={() => this.onUpAmountProduct(product.id, product.amountSell, product.amount)}>
                  <i className="fas fa-caret-right fa-3x"></i>
                </button>
              </span>
              <button className={classes.button} onClick={() => this.onStepAmountProduct(product.id, product.amountSell, product.amount)}>
                <i className="fad fa-arrow-to-top fa-3x m-2"></i>
              </button>
            </div>
            <div className="price_box">
              <h3 className="price_heading">
                {priceExport}
              </h3>
            </div>
            <button className={classes.button} onClick={() => this.onCartRemove(product.id)}><i className="fad fa-trash-alt fa-3x m-2" style={{ color: 'rgb(147 0 0)' }}></i></button>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CartItem);
