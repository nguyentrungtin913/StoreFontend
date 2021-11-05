import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from "./../../constants";

class CartTypeItem extends Component {

  render() {
    let { cartDetail, index, classes } = this.props;
    let total = 0;
    let price = 0;
    if (cartDetail.detailAmount && cartDetail.product.priceExport) {
      total = new Intl.NumberFormat("de-DE").format(
        cartDetail.detailAmount * cartDetail.product.priceExport
      );
      price = new Intl.NumberFormat("de-DE").format(
        cartDetail.product.priceExport
      );
    }
    return (
      <tr>
        <td className={`${classes.tdMiddle}`}>{index + 1}</td>
        <td className={`${classes.tdMiddle}`}>
            <LazyLoadImage
            className={classes.imageProduct}
              src={`${API_URL}/image/${cartDetail.product.image}`}
              alt="" />
          </td>
        <td className={`${classes.tdMiddle}`}>{cartDetail.product.name}</td>
        <td className={`${classes.tdMiddle}`}>{cartDetail.detailAmount}</td>
        <td className={`${classes.tdMiddle}`}>{price}</td>
        <td className={`${classes.tdMiddle}`}>{total}</td>
      </tr>
    );
  }
}

CartTypeItem.propTypes = {
  classes: PropTypes.object,
  productType: PropTypes.object
};

export default withStyles(styles)(CartTypeItem);
