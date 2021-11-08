import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ProductTypeItem from "../ProductTypeItem";

class ProductTypeList extends Component {
  render() {
    const {
      classes,
      productTypes,
      onClickDelete,
      onClickEdit,
      onShowForm
    } = this.props;
    return (
      <div>
        <button
          className="btn btn-lg btn-outline-primary m-2"
          onClick={onShowForm}
        >
          <h3>Thêm loại sản phẩm</h3>
        </button>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách loại sản phẩm</h3>
          </div>
          <div className={`panel-body  ${classes.myPanelProductType}`}>
            <table className={`table table-hover ${classes.listProductType}`}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên loại</th>
                  <th>Ưu tiên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {
                productTypes.map((productType, index) => {
                  return (
                    <ProductTypeItem
                      productType={productType}
                      key={productType.id}
                      index={index}
                      onClickDelete={() => onClickDelete(productType)}
                      onRating={this.props.onRating}
                      onClickEdit={() => onClickEdit(productType)}
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

ProductTypeList.propTypes = {
  classes: PropTypes.object,
  productTypes: PropTypes.array
};

export default withStyles(styles)(ProductTypeList);
