import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { API_URL } from "./../../constants";
import ReactTooltip from 'react-tooltip';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class ProductItem extends Component {
  onChoose = product => {
    this.props.onChoose(product);
  };

  render() {
    let { classes, product, index, filter, onClickDelete, type, onClickEdit, buy } = this.props;
    let classFilter = "";
    let show = "";
    let priceImport = new Intl.NumberFormat("de-DE").format(
      product.priceImport
    );
    let priceExport = new Intl.NumberFormat("de-DE").format(
      product.priceExport
    );

    let classForPriceExport = "";
    let classForPriceImport = "";
    if (buy) {
      classForPriceExport = classes.hidden;
      classForPriceImport = "";
    }else if(buy === 0){
      classForPriceExport = "";
      classForPriceImport = classes.hidden;
    }

    if (filter) {
      classFilter = classes.disable;
      show = classes.show;
    }
    if (product.amount < 1 && type === "sell") {
      return null;
    }
    return (
      <>
        <ReactTooltip
          type="info"
        />
        <tr data-tip={product.note}>
          <td className={`${classFilter} ${classes.tdMiddle}`}>{index + 1}</td>
          <td className={`${classes.tdMiddle}`}>
            <LazyLoadImage
              className={classes.imageProduct}
              // src={`${API_URL}/${product.image}`}
              src={`${API_URL}/image/${product.image}`}
              alt="" />
          </td>
          <td className={`${classes.tdMiddle}`}>
            <div className={`${classes.nameProduct}`}>{product.name}</div>
          </td>
          <td className={`${classForPriceImport} ${classes.tdMiddle}`}>{priceImport}</td>
          <td className={`${classForPriceExport} ${classes.tdMiddle}`}>{priceExport}</td>
          <td className={`${classes.tdMiddle}`}>{product.amount}</td>
          <td className={`${classFilter} ${classes.tdMiddle}`}>{product.amountSell}</td>
          <td className={`${classFilter} ${classes.tdMiddle}`}>{product.productType.name}</td>
          <td className={`${classes.tdMiddle}`} data-tip="">
            <button
              className={`${classes.buttonEdit} ${classFilter} m-2`}
              onClick={onClickEdit}
            >
              <i className="fad fa-pencil-alt"></i>
            </button>
            <button
              className={`${classes.buttonDelete} ${classFilter} m-2`}
              onClick={onClickDelete}
            >
              <i className="fad fa-trash-alt"></i>
            </button>
            <button
              className={`btn btn-lg btn-outline-success ${classes.disable} ${show} m-2`}
              onClick={() => this.onChoose(product)}
            >
              Chọn
            </button>
          </td>
        </tr>
      </>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object,
  product: PropTypes.object
};

export default withStyles(styles)(ProductItem);
