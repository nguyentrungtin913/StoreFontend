import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderList from "../../components/OrderList";
import OrderDetailList from "../../components/OrderDetailList";
import * as reportActions from "./../../actions/order";
import * as orderDetailActions from "./../../actions/orderDetail";
import styles from "./styles";
import _ from "lodash";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      dateStart: "",
      dateEnd: ""
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    const { reportActionsCreators } = this.props;
    const { fetchListOrder } = reportActionsCreators;
    fetchListOrder();
  }

  onDetail = id => {
    this.setState({
      showDetail: true
    });
    const { orderDetailActionsCreators } = this.props;
    const { fetchListOrderDetail } = orderDetailActionsCreators;
    fetchListOrderDetail(id);
  };
  onShowList = () => {
    this.setState({
      showDetail: false
    });
  };
  renderList() {
    let { listOrder, listOrderDetail, classes } = this.props;
    let { showDetail, dateStart, dateEnd } = this.state;
    let xhtmlList, xhtmlDetail = null;
    let total = 0;



    if (showDetail) {
      xhtmlDetail = (
        <OrderDetailList
          showList={this.onShowList}
          orderDetails={listOrderDetail}
        />
      );
      return xhtmlDetail;
    }

    if (dateStart && dateEnd) {
      listOrder = _.filter(listOrder, function (order) {
        return (
          new Date(order.orderDate).getTime() <= new Date(dateEnd).getTime() &&
          new Date(order.orderDate).getTime() >= new Date(dateStart).getTime()
        );
      });
    }

    listOrder.forEach(element => {
      if (element.orderType === "Xuất") {
        total += element.orderTotal;
      } else {
        total -= element.orderTotal;
      }
    });

    total = total.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND"
    });

    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách hóa đơn</h3>
          </div>
          <div className={`${classes.filter}`}>
            <form>
              <span>Từ</span>
              <input
                type="date"
                name="dateStart"
                className={`form-control ${classes.date}`}
                value={dateStart}
                onChange={this.onChange}
              />

              <span>Đến</span>
              <input
                type="date"
                name="dateEnd"
                className={`form-control ${classes.date}`}
                value={dateEnd}
                onChange={this.onChange}
              />
            </form>
          </div>
          <div className={`panel-body ${classes.text} ${classes.myPanelOrder}`}>
            <OrderList orders={listOrder} onClickDetail={this.onDetail} />
          </div>
        </div>
        <div className={`${classes.total}`}>
          <label>Tổng tiền: </label>
          <input className={classes.textTotal} type="text" value={total}></input>
        </div>
      </div>
    );

    return xhtmlList;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        {this.renderList()}
      </div>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object,
  reportActionsCreators: PropTypes.shape({
    fetchListOrder: PropTypes.func
  }),
  listOrder: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listOrder: state.order.listOrder,
    listOrderDetail: state.orderDetail.listOrderDetail
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reportActionsCreators: bindActionCreators(reportActions, dispatch),
    orderDetailActionsCreators: bindActionCreators(orderDetailActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Order)
);
