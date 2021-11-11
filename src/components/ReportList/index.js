import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import ReportItem from "../ReportItem";

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      keyword: "",

    };
  }

  onSell = e => {
    e.preventDefault();
    this.props.onSell(this.state.txtName);
    this.setState({
      txtName: ""
    });
  };

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
    if (name === "keyword") {
      this.props.onFind(value);
    }
  };


  render() {
    let { products, filter, type } = this.props;
    return (
      <>
        {products.map((product, index) => {
          return (
            <ReportItem
              product={product}
              key={product.id}
              index={index}
              filter={filter}
              type={type}
            />
          );
        })}
      </>
    );
  }
}

ReportList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ReportList);
