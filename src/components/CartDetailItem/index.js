import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class CartTypeItem extends Component {

  render() {
    let { cartDetail, index } = this.props;
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
        <td>{index + 1}</td>
        <td>{cartDetail.product.name}</td>
        <td>{cartDetail.detailAmount}</td>
        <td>{price}</td>
        <td>{total}</td>
      </tr>
    );
  }
}

CartTypeItem.propTypes = {
  classes: PropTypes.object,
  productType: PropTypes.object
};

export default withStyles(styles)(CartTypeItem);
