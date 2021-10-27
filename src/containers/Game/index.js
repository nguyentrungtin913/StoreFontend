import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import * as authActions from "./../../actions/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DragonList from './../../components/GameBoard';

class Game extends Component {

  render() {
    //const {classes}= this.props;
    return (
      <div >
        <DragonList/>
      </div>
    );
  }
}
Game.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    login: state.auth.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActionCreators: bindActionCreators(authActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Game)
);
