import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import GameItem from "../GameItem";

class GameBoard extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${classes.board}`}>
        <GameItem/>
      </div>
    );
  }
}

GameBoard.propTypes = {
  classes: PropTypes.object,
  orders: PropTypes.array
};

export default withStyles(styles)(GameBoard);
