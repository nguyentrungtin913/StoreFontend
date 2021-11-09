import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import NotFound from "./../../assets/images/notFound.gif";
class TaskBoard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2 className={classes.text}>404: Page Not Found</h2>
        <img src={NotFound} alt="loading" className={classes.icon} />
      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);
