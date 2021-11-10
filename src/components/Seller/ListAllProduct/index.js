import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ProductItem from "./../ProductItem";

class ListAllProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
    this.props.onFind(value);
  };
  renderProduct = () => {
    let { products, classes } = this.props;
    let { keyword } = this.state;
    let content = [];

    for (let i = 0; i < products.length; i++) {
      content.push(<ProductItem
        key={i}
        product={products[i]}
      />)
    }

    let xhtml = (
      <>
        <section className="veg_section layout_padding" style={{ paddingTop: '0px' }}>
          <div className="container">
            <div className="heading_container heading_center" style={{ alignItems: 'self-start' }}>
              <h2>
                Danh sách tất cả sản phẩm
              </h2>

              <input
                type="text"
                name="keyword"
                className={`form-control ${classes.text} m-2`}
                value={keyword}
                onChange={this.onChange}
                placeholder="Nhập tên sản phẩm cần tìm"
              />

            </div>
            <div className="row">
              {content}
            </div>
          </div>
        </section>
      </>
    )
    return xhtml;
  }


  render() {
    return (
      <>
        {this.renderProduct()}
      </>
    );
  }
}

ListAllProduct.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ListAllProduct);
