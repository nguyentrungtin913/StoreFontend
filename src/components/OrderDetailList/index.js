import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import OrderDetailItem from "../OrderDetailItem";

class OrderDetailList extends Component {
  render() {
    const { classes, orderDetails } = this.props;
    return (
      <div className="m-5">
        <div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Danh sách chi tiết hóa đơn</h3>
            </div>
            <div className={`panel-body  ${classes.myPanelDetail}`}>
              <table className={`table table-hover ${classes.listDetail}`}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((orderDetail, index) => {
                    return (
                      <OrderDetailItem
                        orderDetail={orderDetail}
                        key={orderDetail.id}
                        index={index}
                        buy={this.props.buy}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          className={`btn btn-lg btn-outline-warning m-2`}
          onClick={this.props.showList}
        >
          Trở lại
        </button>
      </div>
    );
  }
}

OrderDetailList.propTypes = {
  classes: PropTypes.object,
  orders: PropTypes.array
};

export default withStyles(styles)(OrderDetailList);
