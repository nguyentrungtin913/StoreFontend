import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class ProductTypeItem extends Component {
  onDetail = id => {
    this.props.onClickDetail(id);
  };
  render() {
    let { orderDetail, index, buy } = this.props;
    let total = 0;
    let price = 0;
    if (buy === 1) {
      price = new Intl.NumberFormat("de-DE").format(orderDetail.product.priceImport);
      total = new Intl.NumberFormat("de-DE").format(orderDetail.detailAmount * orderDetail.product.priceImport);
    } else {
      price = new Intl.NumberFormat("de-DE").format(orderDetail.product.priceExport);
      total = new Intl.NumberFormat("de-DE").format(orderDetail.detailAmount * orderDetail.product.priceExport);
    }

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{orderDetail.product.name}</td>
        <td>{orderDetail.detailAmount}</td>
        <td>{price}</td>
        <td>{total}</td>
      </tr>
    );
  }
}

ProductTypeItem.propTypes = {
  classes: PropTypes.object,
  productType: PropTypes.object
};

export default withStyles(styles)(ProductTypeItem);
