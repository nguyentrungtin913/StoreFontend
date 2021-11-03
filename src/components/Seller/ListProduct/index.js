import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ProductItem from "./../ProductItem";

class ListProduct extends Component {

  renderNewProduct = () => {
    let { products } = this.props;
    let content = [];
    let count = 0;

    for (let i = 0; i < products.length; i++) {
      count++;
      if (count < 7) {
        content.push(<ProductItem
          key={i}
          product={products[i]}
          onAddToCart={this.props.onAddToCart}
        />)
      } else {
        break;
      }
    }

    let xhtml = (
      <>
        <section className="veg_section layout_padding" style={{ paddingTop: '0px' }}>
          <div className="container">
            <div className="heading_container heading_center" style={{ alignItems: 'self-start' }}>
              <h2>
                Sản phẩm mới
              </h2>
            </div>
            <div className="row">
              {content}
            </div>
            <div className="btn-box">
              <a href="\" style={{ color: 'black', textDecoration: 'none', fontSize: '12pt' }}>
                Xem thêm
              </a>
            </div>
          </div>
        </section>
      </>
    )
    return xhtml;
  }
  renderProduct = () => {
    let { products, productTypes } = this.props;
    let xhtml = [];
    let content = [];
    let count = 0;

    for (let i = 0; i < productTypes.length; i++) {
      let listItem = [];
      count++;
      if (count < 4) {
        for (let j = 0; j < products.length; j++) {
          if (productTypes[i].id === products[j].type) {
            listItem.push(<ProductItem
              key={j}
              product={products[j]}
              onAddToCart={this.props.onAddToCart}
            />)
          }
        }
        content = (
          <>
            <section key={i} className="veg_section layout_padding" style={{ paddingTop: '0px' }}>
              <div className="container">
                <div className="heading_container heading_center" style={{ alignItems: 'self-start' }}>
                  <h2>
                    {productTypes[i].name}
                  </h2>
                </div>
                <div className="row">
                  {listItem}
                </div>
                <div className="btn-box">
                  <a href="\" style={{ color: 'black', textDecoration: 'none', fontSize: '12pt' }}>
                    Xem thêm
                  </a>
                </div>
              </div>
            </section>
          </>
        )
        xhtml.push(content);
      } else {
        break;
      }
    }

    return xhtml;
  }

  render() {
    return (
      <>
        {this.renderNewProduct()}
        {this.renderProduct()}
      </>
    );
  }
}

ListProduct.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ListProduct);
