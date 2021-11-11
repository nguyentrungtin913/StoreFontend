import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../constants";

class ReportItem extends Component {
  onChoose = product => {
    this.props.onChoose(product);
  };

  render() {
    let { classes, product, index } = this.props;
    let priceImport = new Intl.NumberFormat("de-DE").format(
      product.priceImport
    );
    let priceExport = new Intl.NumberFormat("de-DE").format(
      product.priceExport
    );

    return (
      <tr>
        <td className={classes.tdMiddle}>{index + 1}</td>
        <td className={classes.tdMiddle}>
          <img
            className={classes.imageProduct}
            src={`${API_URL}/image/${product.image}`}
            alt=""
          />
        </td>
        <td className={classes.tdMiddle}>
          <div className={`${classes.nameProduct}`}>{product.name}</div>
        </td>
        <td className={classes.tdMiddle}>{priceImport}</td>
        <td className={classes.tdMiddle}>{priceExport}</td>
        <td className={classes.tdMiddle}>{product.amount}</td>
        <td className={classes.tdMiddle}>{product.amountSell}</td>
        <td className={classes.tdMiddle}>{product.productType.name}</td>
      </tr>
    );
  }
}

ReportItem.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ReportItem);
