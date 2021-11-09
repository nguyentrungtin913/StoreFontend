import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productTypeActions from "./../../actions/productType";
import * as productActions from "./../../actions/product";
import styles from "./styles";
import { API_URL } from "./../../constants";

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      image: "",
      name: "",
      priceImport: 0,
      priceExport: 0,
      amount: 0,
      amountSell: 0,
      note: "",
      type: "",
      path: ""
    };
  }

  componentDidMount() {
    const { productTypeActionCreators } = this.props;
    const { fetchListProductType } = productTypeActionCreators;
    fetchListProductType();

    const { productEditting } = this.props;
    if (productEditting) {
      this.setState({
        id: productEditting.id,
        path: productEditting.image,
        name: productEditting.name,
        priceImport: productEditting.priceImport,
        priceExport: productEditting.priceExport,
        amount: productEditting.amount,
        amountSell: productEditting.amountSell,
        note: productEditting.note,
        type: productEditting.type,
      });
    }
  }

  createImage(file) {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  showImage = path => {
    var resutl = null;
    if (path) {
      resutl = API_URL + "/image/" + path;
    }
    return resutl;
  };

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "file" ? null : target.value;
    this.setState({
      [name]: value
    });

    if (target.type === "file") {
      var files = target.files;

      this.createImage(files[0]);

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
          continue;
        }
        var img = document.getElementById("showImage");
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function (aImg) {
          return function (e) {
            aImg.src = e.target.result;
          };
        })(img);
        reader.readAsDataURL(file);
      }
    }
  };

  onSave = e => {
    e.preventDefault();
    let {
      id,
      image,
      name,
      priceImport,
      priceExport,
      amount,
      amountSell,
      note,
      type
    } = this.state;
    const { productActionCreators } = this.props;
    const { addProduct, updateProduct } = productActionCreators;

    let product = {};
    if (id) {
      product = {
        id: id,
        name: name,
        image: image,
        priceImport: priceImport,
        priceExport: priceExport,
        amount: amount,
        amountSell: amountSell,
        note: note,
        type: type
      }
      updateProduct(product);
    } else {
      product = {
        name: name,
        image: image,
        priceImport: priceImport,
        priceExport: priceExport,
        amount: amount,
        amountSell: amountSell,
        note: note,
        type: type
      };
      addProduct(product);
    }
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  renderEditting = () => {
    const { productTypeEditting } = this.props;
    if (productTypeEditting) {
      var tmp = this.state.id;
      if (tmp !== "") {
        this.setState({
          id: productTypeEditting.id,
          name: productTypeEditting
        });
      }
    }
  };

  showProductType = listProductType => {
    var result = null;
    if (listProductType.length > 0) {
      result = listProductType.map((type, index) => {
        return (
          <option key={index} value={type.id}>
            {type.name}
          </option>
        );
      });
    }
    return result;
  };
  render() {
    const { classes, listProductType, form } = this.props;
    if (form) {
      this.onCloseForm();
    }
    var {
      name,
      type,
      priceImport,
      priceExport,
      amount,
      amountSell,
      note,
      path
    } = this.state;
    return (
      <form onSubmit={this.onSave}>
        <div className={`panel panel-primary ${classes.myPanelActionProduct} `}>
          <div className="panel-heading">
            <h3 className="panel-title">Thêm sản phẩm</h3>
          </div>
          <div className="panel-body">
            <div className={`${classes.formProduct}`}>
              <div>
                <h3 className="form-label">Tên sản phẩm</h3>
                <input
                  type="text"
                  className={`form-control ${classes.text} `}
                  value={name}
                  name="name"
                  onChange={this.onChange}
                  required
                />
              </div>

              <div>
                <h3 className="form-label">Loại sản phẩm</h3>
                <select
                  className={`form-control ${classes.text} `}
                  value={type}
                  name="type"
                  onChange={this.onChange}
                  required
                >
                  <option>--Chọn--</option>
                  {this.showProductType(listProductType)}
                </select>
              </div>

              <div>
                <h3 className="form-label">Giá nhập</h3>
                <input
                  type="number"
                  className={`form-control ${classes.text} `}
                  value={priceImport}
                  name="priceImport"
                  onChange={this.onChange}
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div>
                <h3 className="form-label">Giá bán</h3>
                <input
                  type="number"
                  className={`form-control ${classes.text} `}
                  value={priceExport}
                  name="priceExport"
                  onChange={this.onChange}
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div>
                <h3 className="form-label">Số lượng hiện tại</h3>
                <input
                  type="number"
                  className={`form-control ${classes.text} `}
                  value={amount}
                  name="amount"
                  onChange={this.onChange}
                  min="0"
                  required
                />
              </div>

              <div>
                <h3 className="form-label">Số lượng đã bán</h3>
                <input
                  type="number"
                  className={`form-control ${classes.text} `}
                  value={amountSell}
                  name="amountSell"
                  onChange={this.onChange}
                  min="0"
                  required
                />
              </div>

              <div>
                <h3 className="form-label">Ghi chú</h3>
                <textarea
                  type="text"
                  className={`form-control ${classes.text} `}
                  value={note}
                  name="note"
                  onChange={this.onChange}
                />
              </div>

              <div>
                <h3 className="form-label">Hình ảnh</h3>
                <input
                  type="file"
                  name="image"
                  onChange={this.onChange}
                  accept="image/*"
                  className={`form-control ${classes.text} `}
                />
              </div>
            </div>
            <div className={classes.box}>
              <img
                id="showImage"
                className={classes.imagePreview}
                src={this.showImage(path)}
                alt="ProductImage"
              />
            </div>
            <div className={classes.boxButton}>
              <button
                className="btn btn-lg btn-warning m-2"
                onClick={this.onCloseForm}
              >
                Trở lại
              </button>
              <button type="submit" className="btn btn-lg btn-primary">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ProductActionPage.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    productTypeEditting: state.productType.productTypeEditting,
    listProductType: state.productType.listProductType,
    form: state.product.form,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productTypeActionCreators: bindActionCreators(productTypeActions, dispatch),
    productActionCreators: bindActionCreators(productActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)
);
