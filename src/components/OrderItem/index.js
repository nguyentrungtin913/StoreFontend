import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class OrderItem extends Component {
  onDetail = id => {
    this.props.onClickDetail(id);
  };

  onDelete = id => {
    this.props.onClickDelete(id);
  };

  render() {
    let { order, index, classes } = this.props;
    let name;
    if (order.orderName) {
      name = order.orderName;
    } else {
      name = <i>( Trống )</i>;
    }

    let total = new Intl.NumberFormat("de-DE").format(order.orderTotal);
    return (
      <tr>
        <td className={`${classes.tdMiddle}`}>{index + 1}</td>
        <td className={`${classes.tdMiddle}`}>{name}</td>
        <td className={`${classes.tdMiddle}`}>{total}</td>
        <td className={`${classes.tdMiddle}`}>{order.orderDate}</td>
        <td className={`${classes.tdMiddle}`}>{order.orderType}</td>
        <td className={`${classes.tdMiddle}`}>
          <button
            className={`${classes.buttonDetail} m-2`}
            onClick={() => this.onDetail(order.orderId)}
          >
            <i className="fad fa-info"></i>
          </button>
          <button
            className={`${classes.buttonDelete} m-2`}
            onClick={() => this.onDelete(order.orderId)}
          >
            <i className="fad fa-trash-alt"></i>
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
