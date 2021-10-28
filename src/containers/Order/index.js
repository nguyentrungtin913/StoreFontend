/* eslint-disable no-unused-expressions */
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderList from "../../components/OrderList";
import OrderDetailList from "../../components/OrderDetailList";
import * as orderActions from "./../../actions/order";
import * as orderDetailActions from "./../../actions/orderDetail";
import styles from "./styles";
import _ from "lodash";


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SortRoundedIcon from '@mui/icons-material/SortRounded';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      dateStart: "",
      dateEnd: "",
      filter: 0,
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
    const { orderActionsCreators } = this.props;
    const { fetchListOrder } = orderActionsCreators;
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
  onDelete = id => {
    if (confirm(`Bạn có muốn hóa đơn không ?`)) { //eslint-disable-line
      const { orderActionsCreators } = this.props;
      const { deleteOrder } = orderActionsCreators;
      deleteOrder(id);
    }
  };

  filterList = (type, popupState) => {
    this.setState({
      filter: type
    });
    popupState.close();
  };

  onExport = () => {
    let { filter, dateStart, dateEnd } = this.state;
    let params = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      type: filter
    }

    const { orderActionsCreators } = this.props;
    const { exportOrder } = orderActionsCreators;
    exportOrder(params);
  }

  renderSort() {
    let xhtml = null;
    const { classes } = this.props;
    xhtml = (
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <button
                variant="contained"
                {...bindTrigger(popupState)}
                className={` btn btn-lg btn-outline-primary m-2 ${classes.myButton}`}
              >
                Phân loại <SortRoundedIcon />
              </button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => this.filterList(0, popupState)}
                  className={classes.myMenuItem}
                >
                  Tất cả
                </MenuItem>
                <MenuItem
                  onClick={() => this.filterList(1, popupState)}
                  className={classes.myMenuItem}
                >
                  Nhập
                </MenuItem>
                <MenuItem
                  onClick={() => this.filterList(2, popupState)}
                  className={classes.myMenuItem}
                >
                  Xuất
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    );
    return xhtml;
  }
  renderList() {
    let { listOrder, listOrderDetail, classes } = this.props;
    let { showDetail, dateStart, dateEnd, filter } = this.state;
    let xhtmlList, xhtmlDetail = null;
    let total = 0;
    let labelPanel = "";
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

    if (filter === 1) {
      labelPanel = "( Nhập )";
      listOrder = _.filter(listOrder, function (order) {
        return order.orderType === 'Nhập';
      })
    } else if (filter === 2) {
      labelPanel = "( Xuất )";
      listOrder = _.filter(listOrder, function (order) {
        return order.orderType === 'Xuất';
      })
    } else {
      labelPanel = "( Tất cả )";
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
            <h3 className="panel-title">Danh sách hóa đơn {labelPanel}</h3>
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
            <OrderList
              orders={listOrder}
              onClickDetail={this.onDetail}
              onClickDelete={this.onDelete} />
          </div>
        </div>
        <div className={`${classes.total}`}>
          <label>Tổng tiền: </label>
          <input className={classes.textTotal} type="text" value={total}></input>
          <button
            className={`btn btn-lg btn-outline-success m-2 ${classes.export}`}
            onClick={() => this.onExport()}
          >
            Xuất File
          </button>
        </div>

      </div>
    );

    return xhtmlList;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        {this.renderSort()}
        {this.renderList()}
      </div>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object,
  orderActionsCreators: PropTypes.shape({
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
    orderActionsCreators: bindActionCreators(orderActions, dispatch),
    orderDetailActionsCreators: bindActionCreators(orderDetailActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Order)
);
