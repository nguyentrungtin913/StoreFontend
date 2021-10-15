import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ReportItem from "../ReportItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      keyword: "",
      anchorEl: null,
      filterList: null
    };
  }
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  onSell = e => {
    e.preventDefault();
    this.props.onSell(this.state.txtName);
    this.setState({
      txtName: ""
    });
  };

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
    if (name === "keyword") {
      this.props.onFind(value);
    }
  };
  filterList = (type, popupState) => {
    popupState.close();
    this.setState({
      filterList: type
    });
    this.props.filterList(type);
  };
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
                Lọc <FilterAltIcon />
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
                  Hết hàng
                </MenuItem>
                <MenuItem
                  onClick={() => this.filterList(2, popupState)}
                  className={classes.myMenuItem}
                >
                  Còn hàng
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    );
    return xhtml;
  }
  render() {
    let { classes, products, filter, type } = this.props;
    let { keyword, filterList } = this.state;
    let labelName = "";
    if (filterList === 1) {
      labelName = "( Đã hết hàng )";
    } else if (filterList === 2) {
      labelName = "( Còn hàng )";
    } else if (filterList === 0) {
      labelName = "( Tất cả )";
    }

    return (
      <div>
        {this.renderSort()}
        <div className={`panel panel-success`}>
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách sản phẩm {labelName}</h3>
          </div>
          <div className={`panel-body  ${classes.myPanelProduct}`}>
            <table className={`table table-hover ${classes.listProduct}`}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th className="name-product">Tên sản phẩm</th>
                  <th>Giá nhập</th>
                  <th>Giá bán</th>
                  <th>Số lượng còn lại</th>
                  <th>Số lượng đã bán</th>
                  <th>Loại</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="9">
                    <input
                      type="text"
                      className="form-control search"
                      value={keyword}
                      name="keyword"
                      placeholder="Nhập tên sản phẩm cần lọc"
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                {products.map((product, index) => {
                  return (
                    <ReportItem
                      product={product}
                      key={product.id}
                      index={index}
                      filter={filter}
                      type={type}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ReportList.propTypes = {
  classes: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(ReportList);
