import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class ProductTypeItem extends Component {
  render() {
    let { productType, index, onClickDelete, onClickEdit, classes } = this.props;
    return (
      <tr>
        <td className={`${classes.tdMiddle}`}>{index + 1}</td>
        <td className={`${classes.tdMiddle}`}>{productType.name}</td>
        <td className={`${classes.tdMiddle}`}>
          <button
            className={`${classes.buttonEdit} m-2`}
            onClick={onClickEdit}
          >
            <i className="fad fa-pencil-alt"></i>
          </button>

          <button
            className={`${classes.buttonDelete} m-2`}
            onClick={onClickDelete}
          >
            <i className="fad fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    );
  }
}

ProductTypeItem.propTypes = {
  classes: PropTypes.object,
  productType: PropTypes.object
};

export default withStyles(styles)(ProductTypeItem);
