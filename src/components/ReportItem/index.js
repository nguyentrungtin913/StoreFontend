import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../constants";

class ReportItem extends Component {
  onChoose = product => {
    //console.log(product)
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
        <td>{index + 1}</td>
        <td>
          <img
            className={classes.imageProduct}
            src={`${API_URL}/${product.image}`}
            alt=""
          />
        </td>
        <td>
          <div className={`${classes.nameProduct}`}>{product.name}</div>
        </td>
        <td>{priceImport}</td>
        <td>{priceExport}</td>
        <td>{product.amount}</td>
        <td>{product.amountSell}</td>
        <td>{product.productType.name}</td>
      </tr>
    );
  }
}

ReportItem.propTypes = {
  classes: PropTypes.object,
  product: PropTypes.object
};

export default withStyles(styles)(ReportItem);
