import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import OrderItem from "../OrderItem";

class OrderList extends Component {
  render() {
    const { classes, orders } = this.props;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className={`table table-hover ${classes.listOrder} col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người mua</th>
              <th>Tổng tiền</th>
              <th>Ngày xuất</th>
              <th>Loại hóa đơn</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <OrderItem
                  order={order}
                  key={order.id}
                  index={index}
                  onClickDetail={this.props.onClickDetail}
                  onClickDelete ={this.props.onClickDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

OrderList.propTypes = {
  classes: PropTypes.object,
  orders: PropTypes.array
};

export default withStyles(styles)(OrderList);
