import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../constants";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

class ProductItemSell extends Component {
  onCancel = id => {
    this.props.onCancel(id);
  };

  onDown = id => {
    this.props.onDown(id);
  };

  onUp = id => {
    this.props.onUp(id);
  };

  render() {
    let { classes, product } = this.props;
    return (
      <tr className={classes.MyTr}>
        <td>
          <img
            className={classes.imageProductSell}
            src={`${API_URL}/image/${product.image}`}
            alt=""
          />
        </td>
        <td>
          <div className={`${classes.nameProduct}`}>{product.name}</div>
        </td>
        <td>
          <ArrowLeftIcon
            sx={{ fontSize: 35 }}
            onClick={() => this.onDown(product.id)}
          />
          {product.amountSell}
          <ArrowRightIcon
            sx={{ fontSize: 35 }}
            onClick={() => this.onUp(product.id)}
          />
        </td>
        <td>
          <button
            className={`btn btn-lg btn-outline-warning`}
            onClick={() => this.onCancel(product.id)}
          >
            Hủy
          </button>
        </td>
      </tr>
    );
  }
}

ProductItemSell.propTypes = {
  classes: PropTypes.object,
  product: PropTypes.object
};

export default withStyles(styles)(ProductItemSell);
