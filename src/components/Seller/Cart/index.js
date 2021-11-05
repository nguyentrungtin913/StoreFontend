import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import CartItem from "./../CartItem";

class Cart extends Component {

  renderNewProduct = () => {
    let { products, classes } = this.props;
    let content = [];
    for (let i = 0; i < products.length; i++) {
      content.push(<CartItem
        key={i}
        product={products[i]}
        onCartRemove={this.props.onCartRemove}
        onUpAmountProduct={this.props.onUpAmountProduct}
        onDownAmountProduct={this.props.onDownAmountProduct}
        onStepAmountProduct={this.props.onStepAmountProduct}
      />)
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
              {content}
            </div>
            <button
              type="button"
              className={`btn btn-success ${classes.myButton}`}
              onClick={this.props.onBuy}
            >Mua hàng</button>
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
