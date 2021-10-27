import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ProductItem from "../ProductItem";
import ProductItemSell from "../ProductItemSell";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Empty from "./../../assets/images/emptyList.png";

class ProductList extends Component {
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
  renderSort(classFilter) {
    let xhtml = null;
    const { classes } = this.props;
    xhtml = (
      <div className={classFilter}>
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
    let {
      classes,
      products,
      productsChoose,
      filter,
      onClickDelete,
      onShowForm,
      type,
      buy,
      onClickEdit
    } = this.props;
    let { txtName, keyword, filterList } = this.state;
    let labelName = "";
    if (filterList === 1) {
      labelName = "( Đã hết hàng )";
    } else if (filterList === 2) {
      labelName = "( Còn hàng )";
    } else if (filterList === 0) {
      labelName = "( Tất cả )";
    }

    let labelButton = "Xuất";
    if (buy) {
      labelButton = "Nhập kho";
    }

    let classFilter = "";
    let resizePanel = "";
    let show = "";
    let hidden = classes.disable;
    if (filter) {
      classFilter = classes.disable;
      show = classes.show;
      resizePanel = classes.resizeMyPanelProduct;
    }
    if (productsChoose.length > 0) {
      hidden = "";
    }
    let xhtml;
    if (!products.length > 0) {
      xhtml = (
        <tr>
          <td colSpan={9} style={{
            backgroundImage: `url(${Empty})`
          }} className={classes.backgroundEmpty}><div className={classes.textEmpty}></div></td>
        </tr>
      )
    } else {
      xhtml = (
        products.map((product, index) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              index={index}
              filter={filter}
              onChoose={this.props.onChoose}
              onClickDelete={() => onClickDelete(product)}
              type={type}
              onClickEdit={() => onClickEdit(product)}
            />
          );
        })
      )
    }


    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <button
          className={` btn btn-lg btn-outline-primary m-2 ${classes.inline} ${classFilter}`}
          onClick={onShowForm}
        >
          <h3>Thêm sản phẩm</h3>
        </button>
        {this.renderSort(classFilter)}
        <table className={`${classes.myTable}`}>
          <tbody>
            <tr>
              <td rowSpan={2} style={{width: '65%'}}>
                <div className={`panel panel-success`}>
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      Danh sách sản phẩm {labelName}
                    </h3>
                  </div>
                  <div className={`panel-body ${classes.myPanelProduct} ${resizePanel}`}>
                    <table
                      className={`table table-hover ${classes.listProduct} `}
                    >
                      <thead>
                        <tr>
                          <th className={classFilter}>STT</th>
                          <th>Hình ảnh</th>
                          <th className="name-product">Tên sản phẩm</th>
                          <th className={classFilter}>Giá nhập</th>
                          <th>Giá bán</th>
                          <th>Số lượng còn lại</th>
                          <th className={classFilter}>Số lượng đã bán</th>
                          <th className={classFilter}>Loại</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="9">
                            <input
                              type="text"
                              className={`form-control ${classes.search}`}
                              value={keyword}
                              name="keyword"
                              placeholder="Nhập tên sản phẩm cần lọc"
                              onChange={this.onChange}
                            />
                          </td>
                        </tr>
                        {xhtml}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
              <td className={`${classes.myTd} ${classes.disable} ${show} `}>
                <div
                  className={`panel panel-success ${classes.myPanelProductSell} `}
                >
                  <div className="panel-heading">
                    <h3 className="panel-title">Danh sách sản phẩm</h3>
                  </div>
                  <div
                    className={`panel-body ${classes.myPanelProductSellBody}`}
                  >
                    <table className={`panel-body  ${classes.listProductSell} `}  >
                      <thead>
                        <tr>
                          <th>Hình ảnh</th>
                          <th className="name-product">Tên sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsChoose.map((productChoose, index) => {
                          return (
                            <ProductItemSell
                              product={productChoose}
                              key={productChoose.id}
                              index={index}
                              onCancel={this.props.onCancel}
                              onUp={this.props.onUp}
                              onDown={this.props.onDown}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            <tr className={`disable ${classes.myTr}`}>
              <td className={`${classes.myTd} ${classes.disable} ${show} `}>
                <form onSubmit={this.onSell}>
                  <table>
                    <tr>
                      <td>
                        <h4 className="m-3">Họ tên: </h4>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="txtName"
                          className={`form-control ${classes.myInput}`}
                          value={txtName}
                          onChange={this.onChange}
                        />
                      </td>
                      <td rowSpan="2">
                        <button
                          type="submit"
                          className={`btn btn-lg btn-outline-success ${hidden}`}
                        >
                          {labelButton}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 className="m-3">Tổng tiền: </h4>
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${classes.myInput}`}
                          value={this.props.totalPrice}
                          readOnly
                        />
                      </td>
                    </tr>
                  </table>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(ProductList);
