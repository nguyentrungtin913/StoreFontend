import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import CartItem from "./../CartItem";
class Cart extends Component {

  renderNewProduct = () => {
    let { products, classes } = this.props;
    let content = [];
    let hidden = '';
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
    if (products.length < 1) {
      content.push(<img src="/images/cartEmpty.png" alt="" className={classes.image} />)
      hidden = classes.hidden;
    }

    let total = 0;
    products.forEach(e => {
      total += (e.priceExport * parseInt(e.amountSell));
    });
    total = new Intl.NumberFormat("de-DE").format(total);
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
            <div>
              <button
                type="button"
                style={{ marginTop: '50px' }}
                className={`btn btn-success ${classes.myButton} ${hidden} `}
                onClick={this.props.onBuy}
              >Mua hàng</button>
              <input
                type="text"
                value={total}
                style={{ marginTop: '50px', marginRight: '20px', width: '190px', textAlign: 'right' }}
                className={`form-control ${classes.myButton} ${hidden}`}
              />

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
