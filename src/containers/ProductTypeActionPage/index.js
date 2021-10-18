import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productTypeActions from "./../../actions/productType";
import styles from "./styles";

class ProductTypeActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      newName: ""
    };
  }

  // componentDidMount() {
  //   const { productTypeEditting } = this.props;
  //   if (productTypeEditting) {
  //     this.setState({
  //       id: productTypeEditting.id,
  //       name: productTypeEditting.name
  //     });

  //   }
  // }

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSave = e => {
    e.preventDefault();
    let { id, name, newName } = this.state;
    const { productTypeActionCreators } = this.props;
    const { addProductType, updateProductType } = productTypeActionCreators;
    let productType = {};
    if (id) {
      productType = {
        typeId: id,
        typeName: newName
      }
      updateProductType(productType);
    } else {
      productType = {
        typeName: name
      };
      addProductType(productType);
    }
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  render() {
    const { classes, form } = this.props;
    console.log(form)
    if (form) {
      this.onCloseForm();
    }

    var { id, name, newName } = this.state;
    var lable = id ? "Tên loại sản phẩm cũ" : "Tên loại sản phẩm";
    var title = id ? "Sửa" : "Thêm";
    var className = id ? "" : classes.disable;

    return (
      <form onSubmit={this.onSave}>
        <div className="panel panel-primary mlr-10">
          <div className="panel-heading">
            <h3 className="panel-title">{title} loại sản phẩm</h3>
          </div>
          <div className="panel-body">
            <div>
              <h3 className="form-label">{lable}</h3>
              <input
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={this.onChange}
                required
              />
            </div>
            <br />
            <div className={className}>
              <h3 className="form-label">Tên loại sản phẩm mới</h3>
              <input
                type="text"
                className="form-control"
                value={newName}
                name="newName"
                onChange={this.onChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary">
              Lưu
            </button>
          </div>
        </div>
      </form >
    );
  }
}

ProductTypeActionPage.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    form: state.productType.form
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductTypeActionPage)
);
