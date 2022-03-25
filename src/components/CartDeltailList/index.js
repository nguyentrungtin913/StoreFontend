import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import CartDetailItem from "../CartDetailItem";

class CartDetailList extends Component {
  render() {
    const { classes, cartDetails, productsSoldOut, products } = this.props;
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
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.map((cartDetail, index) => {
                    let pro = productsSoldOut.filter(item => item.id === cartDetail.productId).length > 0 ? true : false;
                    let insufficient = false;
                    for (let i = 0; i < products.length; i++) {
                      if (products[i].id === cartDetail.productId) {
                        if (products[i].amount < cartDetail.detailAmount) {
                          insufficient = true;
                        }
                        break;
                      }

                    }
                    return (
                      <CartDetailItem
                        cartDetail={cartDetail}
                        key={cartDetail.id}
                        index={index}
                        soldOut={pro}
                        insufficient={insufficient}
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
          onClick={this.props.onShowList}
        >
          Trở lại
        </button>
      </div>
    );
  }
}

CartDetailList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CartDetailList);
