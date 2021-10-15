import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class ProductTypeItem extends Component {
  render() {
    let { productType, index, onClickDelete, onClickEdit } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{productType.name}</td>
        <td>
          <button
            className="btn btn-lg btn-outline-warning m-2"
            onClick={onClickEdit}
          >
            Sửa
          </button>
          <button
            className="btn btn-lg btn-outline-danger m-2"
            onClick={onClickDelete}
          >
            Xóa
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
