import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import CartItem from "../CartItem";

class CartList extends Component {

  onClear = () => {
    if (confirm(`Bạn có muốn xóa các đơn hàng đã được xữ lý không ?`)) { //eslint-disable-line
      this.props.onClear();
    }
  }

  render() {
    const { classes, carts } = this.props;
    return (
      <div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách đơn đặt hàng</h3>
          </div>
          <div className={`panel-body  ${classes.myPanelProductType}`}>
            <table className={`table table-hover ${classes.listProductType}`}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên người đặt</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Tình trạng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, index) => {
                  return (
                    <CartItem
                      cart={cart}
                      key={cart.id}
                      index={index}
                      onUpdateStatus={this.props.onUpdateStatus}
                      onClickDetail={this.props.onClickDetail}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <button
          type="button"
          style={{float: 'right'}}
          className="btn btn-lg btn-outline-danger"
          onClick={() => this.onClear()}
        >Xóa đơn hàng đã xữ lý</button>
      </div>
    );
  }
}

CartList.propTypes = {
  classes: PropTypes.object,
  productTypes: PropTypes.array
};

export default withStyles(styles)(CartList);
