import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class OrderItem extends Component {
  onDetail = id => {
    this.props.onClickDetail(id);
  };
  onDetele = id => {
    if (confirm(`Bạn có muốn hóa đơn không ?`)) { //eslint-disable-line
      const { productTypeActionCreators } = this.props;
      const { deleteProductType } = productTypeActionCreators;
      deleteProductType(id);
    }
  };
  render() {
    let { order, index } = this.props;
    let name;
    if (order.orderName) {
      name = order.orderName;
    } else {
      name = <i>( Trống )</i>;
    }

    let total = new Intl.NumberFormat("de-DE").format(order.orderTotal);
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{total}</td>
        <td>{order.orderDate}</td>
        <td>{order.orderType}</td>
        <td>
          <button
            className={`btn btn-lg btn-outline-success m-2`}
            onClick={() => this.onDetail(order.orderId)}
          >
            Chi tiết
          </button>
          <button
            className={`btn btn-lg btn-outline-danger m-2`}
            onClick={() => this.onDetele(order.orderId)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

OrderItem.propTypes = {
  classes: PropTypes.object,
  order: PropTypes.object
};

export default withStyles(styles)(OrderItem);
