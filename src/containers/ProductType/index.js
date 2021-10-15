import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductTypeList from "../../components/ProductTypeList";
import * as productTypeActions from "./../../actions/productType";
import styles from "./styles";
import ProductTypeActionPage from "../ProductTypeActionPage";
class ProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false
    };
  }
  componentDidMount() {
    const { productTypeActionCreators } = this.props;
    const { fetchListProductType } = productTypeActionCreators;
    fetchListProductType();
  }
  onShowForm = () => {
    const { productTypeActionCreators } = this.props;
    const { openForm } = productTypeActionCreators;
    openForm();
    this.setState({
      add: true
    });
  };
  onCloseForm = () => {
    this.setState({
      add: false
    });
  };
  showDeleteProductType = productType => {
    const { name, id } = productType;
    if (confirm(`Bạn có muốn xóa loại sản phẩm \` ${name} \` không ?`)) { //eslint-disable-line
      const { productTypeActionCreators } = this.props;
      const { deleteProductType } = productTypeActionCreators;
      deleteProductType(id);
    }
  };
  handleEditProductType = productType => {
    const { productTypeActionCreators } = this.props;
    const { setProductTypeEditing } = productTypeActionCreators;
    setProductTypeEditing(productType);
    this.onShowForm();
  };
  renderBoard() {
    const { add } = this.state;
    const { listProductType } = this.props;
    let xhtmlList,
      xhtmlAdd = null;
    xhtmlList = (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ProductTypeList
          productTypes={listProductType}
          onShowForm={this.onShowForm}
          onClickEdit={this.handleEditProductType}
          onClickDelete={this.showDeleteProductType}
        />
      </div>
    );
    xhtmlAdd = <ProductTypeActionPage onCloseForm={this.onCloseForm} />;
    if (add) {
      return xhtmlAdd;
    } else {
      return xhtmlList;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        {this.renderBoard()}
      </div>
    );
  }
}

ProductType.propTypes = {
  classes: PropTypes.object,
  productTypeActionCreators: PropTypes.shape({
    fetchListProductType: PropTypes.func
  }),
  listProductType: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listProductType: state.productType.listProductType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductType)
);
