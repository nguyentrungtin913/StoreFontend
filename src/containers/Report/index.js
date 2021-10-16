import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReportList from "../../components/ReportList";
import * as reportActions from "./../../actions/report";
import styles from "./styles";
import _ from "lodash";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CachedIcon from '@mui/icons-material/Cached';
import IconButton from '@mui/material/IconButton';
import Empty from "./../../assets/images/emptyList.png";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      keyword: "",
      filter: 0,
      dateStart: "",
      dateEnd: "",
      anchorEl: null,

    };
  }

  componentDidMount() {
    const { reportActionsCreators } = this.props;
    const { fetchListReport } = reportActionsCreators;
    fetchListReport();
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onFind = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  onfilterList = type => {
    this.setState({
      filter: type
    });

  };
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
  filterList = (type, popupState) => {
    let { dateStart, dateEnd } = this.state;
    this.setState({
      filter: type
    });
    popupState.close();
    let params = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      type: type
    }
    const { reportActionsCreators } = this.props;
    console.log(params)
    const { fetchListReport } = reportActionsCreators;
    fetchListReport(params);
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
                Sắp xếp <FilterAltIcon />
              </button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => this.filterList(0, popupState)}
                  className={classes.myMenuItem}
                >
                  Bán chạy
                </MenuItem>
                <MenuItem
                  onClick={() => this.filterList(1, popupState)}
                  className={classes.myMenuItem}
                >
                  Bán chậm
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    );
    return xhtml;
  }
  onReset = () => {
    this.setState({
      dateStart: "",
      dateEnd: "",
    });
    const { reportActionsCreators } = this.props;
    const { fetchListReport } = reportActionsCreators;
    fetchListReport();
  }

  rederContent = (listProduct, classes) => {
    let xhtml = null;
    if (listProduct.length > 0) {
      xhtml = (
        <ReportList
          products={listProduct}
          onShowForm={this.onShowForm}
          onFind={this.onFind}
          filterList={this.onfilterList}
        />
      )
    } else {
      xhtml = (
        <tbody >
          <tr>
            <td colSpan={8} style={{
              backgroundImage: `url(${Empty})`
            }} className={classes.backgroundEmpty}><div className={classes.textEmpty}></div></td>
          </tr>
        </tbody>

      )
    }

    return xhtml;
  }
  renderList() {
    let { listProduct, classes } = this.props;
    let { keyword, filter, dateStart, dateEnd } = this.state;
    let xhtmlList = null;
    if (dateStart && dateEnd) {
      let params = {
        dateStart: dateStart,
        dateEnd: dateEnd,
        type: filter
      }
      const { reportActionsCreators } = this.props;
      const { fetchListReport } = reportActionsCreators;
      fetchListReport(params);
    }

    if (keyword) {
      listProduct = _.filter(listProduct, function (product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {this.renderSort()}
        <div className={`panel panel-success`}>
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách sản phẩm bán</h3>
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
              <IconButton onClick={this.onReset}>
                <CachedIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </form>
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
              {
                this.rederContent(listProduct, classes)
              }
            </table>
          </div>
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

Report.propTypes = {
  classes: PropTypes.object,
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func
  }),
  listProduc: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProduct: state.reportProduct.listProductReport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reportActionsCreators: bindActionCreators(reportActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Report)
);
