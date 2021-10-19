import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../constants";

class ProductItem extends Component {
  onChoose = product => {
    this.props.onChoose(product);
  };

  render() {
    let { classes, product, index, filter, onClickDelete, type, onClickEdit } = this.props;
    let classFilter = "";
    let show = "";
    let priceImport = new Intl.NumberFormat("de-DE").format(
      product.priceImport
    );
    let priceExport = new Intl.NumberFormat("de-DE").format(
      product.priceExport
    );
    if (filter) {
      classFilter = classes.disable;
      show = classes.show;
    }
    if (product.amount < 1 && type === "sell") {
      return null;
    }
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
        <td className={classFilter}>{priceImport}</td>
        <td>{priceExport}</td>
        <td>{product.amount}</td>
        <td className={classFilter}>{product.amountSell}</td>
        <td className={classFilter}>{product.productType.name}</td>
        <td>
        <button
            className={`btn btn-lg btn-outline-warning ${classFilter} m-2`}
            onClick={onClickEdit}
          >
            Sửa
          </button>
          <button
            className={`btn btn-lg btn-outline-danger ${classFilter} m-2`}
            onClick={onClickDelete}
          >
            Xóa
          </button>
          <button
            className={`btn btn-lg btn-outline-success ${classes.disable} ${show} m-2`}
            onClick={() => this.onChoose(product)}
          >
            Chọn
          </button>
        </td>
      </tr>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object,
  product: PropTypes.object
};

export default withStyles(styles)(ProductItem);
