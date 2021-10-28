/* eslint-disable no-unused-expressions */
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReportList from "../../components/ReportList";
import * as reportActions from "./../../actions/report";
import styles from "./styles";
import _ from "lodash";
import Empty from "./../../assets/images/emptyList.png";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterAltIcon from "@mui/icons-material/FilterAlt";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      keyword: "",
      anchorEl: null,
      right: false,
      status: 1,
      sort: 1,
      dStart: "",
      dEnd: "",
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
    console.log(name + " : " + value)
  };

  onFilter = () => {
    let { status, sort, dStart, dEnd } = this.state;
    let params;
    this.setState({
      right: false
    })
    if (parseInt(status) === 1) {
      params = {
        dateStart: dStart,
        dateEnd: dEnd,
        type: parseInt(sort),
        status: 1
      }
      console.log(params)
    } else {
      params = {
        dateStart: dStart,
        dateEnd: dEnd,
        status: 0
      }
    }
    const { reportActionsCreators } = this.props;
    const { fetchListReport } = reportActionsCreators;
    fetchListReport(params);
  }
  onReset = () => {
    this.setState({
      dStart: "",
      dEnd: "",
      keyword: "",
      sort: 1,
      right: false,
      status: 1
    });
    let params = {
      dateStart: "",
      dateEnd: "",
      type: 1
    }
    const { reportActionsCreators } = this.props;
    const { fetchListReport } = reportActionsCreators;
    fetchListReport(params);
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ [anchor]: open });
  };

  list = (anchor) => (
    <Box
      sx={{ width: 300, fontSize: 25 }}
      role="presentation"
      className="m-3"
    // onClick={this.toggleDrawer(anchor, false)}
    // onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant="h4">
          Trạng thái
        </Typography>
        <RadioGroup row aria-label="gender" onChange={this.onChange} value={this.state.status} name="status" className="m-3">
          <FormControlLabel className={this.props.classes.textFilter} value={1} control={<Radio />} label={<Typography variant="h5" >Đã bán</Typography>} />
          <FormControlLabel className={this.props.classes.textFilter} value={0} control={<Radio />} label={<Typography variant="h5" >Chưa bán</Typography>} />
        </RadioGroup>
      </List>
      <Divider />

      <List>
        <Typography variant="h4">
          Sắp xếp
        </Typography>
        <RadioGroup row aria-label="gender" onChange={this.onChange} name="sort" value={this.state.sort} className="m-3">
          <FormControlLabel disabled={parseInt(this.state.status) === 1 ? '' : 'disabled'} control={<Radio value={1} />} label={<Typography variant="h5" >Bán chạy</Typography>} />
          <FormControlLabel disabled={parseInt(this.state.status) === 1 ? '' : 'disabled'} control={<Radio value={0} />} label={<Typography variant="h5" >Bán chậm</Typography>} />
        </RadioGroup>
      </List>
      <Divider />
      <List>
        <Typography variant="h4">
          Lọc
        </Typography>
        <div className="m-3">
          <Typography variant="h5" >
            Từ ngày
          </Typography>
          <input
            type="date"
            name="dStart"
            value={this.state.dStart}
            className={`form-control m-3 ${this.props.classes.textFilter}`}
            onChange={this.onChange}
          />
          <Typography variant="h5" >
            Đến ngày
          </Typography>
          <input
            type="date"
            name="dEnd"
            value={this.state.dEnd}
            className={`form-control m-3 ${this.props.classes.textFilter}`}
            onChange={this.onChange}
          />
        </div>
      </List>
      <Divider />
      <List style={{textAlign: 'center'}}>
        <button type="button" onClick={this.onReset} className={`btn btn-outline-warning ${this.props.classes.textFilter} m-3`}>Mặc định</button>
        <button type="button" onClick={this.onFilter} className={`btn btn-outline-success ${this.props.classes.textFilter} m-3`}>Lọc</button>
      </List>
    </Box>
  );

  renderFilter() {
    let xhtml = null;
    xhtml = (
      <React.Fragment key={"right"}>
        <button onClick={this.toggleDrawer("right", true)} className={` btn btn-lg btn-outline-primary m-2 ${this.props.classes.myButton}`}>Lọc <FilterAltIcon /> </button>
        <Drawer
          anchor={"right"}
          open={this.state["right"]}
          onClose={this.toggleDrawer("right", false)}
        >
          {this.list("right")}
        </Drawer>
      </React.Fragment>
    )
    return xhtml;
  }
  componentDidMount() {
    const { reportActionsCreators } = this.props;
    const { fetchListReport } = reportActionsCreators;
    let params = {
      type: this.state.sort
    }
    fetchListReport(params);
  }

  onFind = keyword => {
    this.setState({
      keyword: keyword
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


  rederContent = (listProduct, classes) => {
    let xhtml, xFilter = null;
    let { keyword } = this.state;
    xFilter = (
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
    )
    if (listProduct.length > 0) {
      xhtml = (
        <tbody>
          {xFilter}
          <ReportList
            products={listProduct}
            onShowForm={this.onShowForm}
            onFind={this.onFind}
            filterList={this.onfilterList}
          />
        </tbody>
      )
    } else {
      xhtml = (
        <tbody >
          {xFilter}
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
    let { keyword } = this.state;
    let xhtmlList = null;
    if (keyword) {
      listProduct = _.filter(listProduct, function (product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className={`panel panel-success`}>
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách sản phẩm đã bán</h3>
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
        {this.renderFilter()}
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
