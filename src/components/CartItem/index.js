/* eslint-disable default-case */
import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";

class CartItem extends Component {

  onUpdateStatus = (id, status) => {
    let label = (status === 1) ? ' Xác nhận ' : ' Hủy ';
    if (confirm(`Bạn muốn \'${label}\' đơn hàng ?`)) { //eslint-disable-line
      this.props.onUpdateStatus(id, status);
    }
  }
  onShow = id => {
    this.props.onClickDetail(id);
  }

  render() {
    let { cart, index, classes } = this.props;
    let status = '';
    let show = '';
    let total = new Intl.NumberFormat("de-DE").format(cart.cartTotal);

    switch (cart.cartStatus) {
      case 0:
        status = <span style={{ color: 'red' }}>Chờ xác nhận</span>;
        show = classes.show;
        break;
      case 1:
        status = <span style={{ color: '#31b917' }}> Đã xác nhận </span>;
        break;
      case 2:
        status = <span> Đã hủy </span>
        break;
    }
    return (
      <tr>
        <td className={`${classes.tdMiddle}`}>{index + 1}</td>
        <td className={`${classes.tdMiddle}`}>{cart.cartName}</td>
        <td className={`${classes.tdMiddle}`}>{cart.cartPhone}</td>
        <td className={`${classes.tdMiddle}`}>{total}</td>
        <td className={`${classes.tdMiddle}`}>
          {status}
        </td>
        <td className={`${classes.tdMiddle}`}>
          <div className={`${classes.left}`}>
            <button className={`btn btn-sm btn-primary m-2 ${classes.button}`} onClick={() => this.onShow(cart.cartId)}>Chi tiết</button>
            <button onClick={() => this.onUpdateStatus(cart.cartId, 1)} style={{ display: 'none' }} className={`btn btn-sm btn-success m-2 ${classes.button} ${show}`}>Xác nhận</button>
            <button onClick={() => this.onUpdateStatus(cart.cartId, 2)} style={{ display: 'none' }} className={`btn btn-sm btn-warning m-2 ${classes.button} ${show}`}>Hủy</button>
          </div>
        </td>
      </tr>
    );
  }
}

CartItem.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CartItem);
