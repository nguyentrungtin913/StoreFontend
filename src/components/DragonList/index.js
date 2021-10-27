import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import DragonItem from "../DragonItem";

class DragonList extends Component {

  renderDragon = () => {
    let xhtml ;
    let loop = 3;

    for (let i = 0; i < loop; i++) {
      xhtml += (
        <DragonItem />
      )
    }
    return xhtml;
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${classes.board}`}>
         <DragonItem />
      </div>
    );
  }
}

DragonList.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(DragonList);
