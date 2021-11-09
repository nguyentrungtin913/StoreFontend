import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../../constants";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { onAddToCart } from './../../../helpers/cartHelper';
class ProductItem extends Component {

  onAddToCart = (id) => {
    onAddToCart(id);
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
            <button className={classes.button} onClick={() => this.onAddToCart(product.id)}><i className="fad fa-cart-arrow-down fa-3x" style={{ color: 'rgb(13 49 151)' }}></i></button>
            <div className="price_box">
              <h3 className="price_heading">
                {priceExport}
              </h3>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProductItem);
