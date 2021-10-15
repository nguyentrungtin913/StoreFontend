import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class ProductTypeItem extends Component {
  onDetail = id => {
    this.props.onClickDetail(id);
  };
  render() {
    let { orderDetail, index } = this.props;
    let total = new Intl.NumberFormat("de-DE").format(
      orderDetail.detailAmount * orderDetail.product.priceExport
    );
    let price = new Intl.NumberFormat("de-DE").format(
      orderDetail.product.priceExport
    );
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
