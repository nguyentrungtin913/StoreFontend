import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ProductItem from "./../ProductItem";

class Cart extends Component {

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
                Giỏ hàng của bạn
              </h2>
            </div>
            <div className="row">

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
        {this.renderNewProduct()}
      </>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Cart);
