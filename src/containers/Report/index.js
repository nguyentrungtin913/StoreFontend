import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReportList from "../../components/ReportList";
import * as productActions from "./../../actions/product";
import styles from "./styles";
import _ from "lodash";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      keyword: "",
      filter: 0
    };
  }
  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct } = productActionCreators;
    fetchListProduct();
  }
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
  renderList() {
    let { listProduct } = this.props;
    let { keyword, filter } = this.state;
    let xhtmlList = null;

    if (keyword) {
      listProduct = _.filter(listProduct, function(product) {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    if (filter !== 0) {
      if (filter === 1) {
        listProduct = _.filter(listProduct, function(product) {
          return product.amount === 0;
        });
      } else if (filter === 2) {
        listProduct = _.filter(listProduct, function(product) {
          return product.amount > 0;
        });
      }
    }
    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ReportList
          products={listProduct}
          onShowForm={this.onShowForm}
          onFind={this.onFind}
          filterList={this.onfilterList}
        />
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
    listProduct: state.product.listProduct
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Report)
);
