import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../../constants";
import { LazyLoadImage } from 'react-lazy-load-image-component';
class ProductItem extends Component {
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
            <h3>{product.name}</h3>
            <button className={classes.button}><i className="fad fa-cart-arrow-down fa-3x" style={{ color: 'rgb(13 49 151)' }}></i></button>
            <div className="price_box">
              <h4 className="price_heading">
                {priceExport}
              </h4>
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