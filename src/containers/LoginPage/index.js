import React, { Component } from "react";
import styles from "./styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as authActions from "./../../actions/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: ""
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSave = e => {
    e.preventDefault();
    let { txtUsername, txtPassword } = this.state;
    let user = {
      email: txtUsername,
      password: txtPassword
    };
    const { authActionCreators } = this.props;
    const { login } = authActionCreators;
    login(user);
  };
  render() {
    const { classes, login } = this.props;
    let { txtUsername, txtPassword } = this.state;
    if (login) {
      const { history } = this.props;
      if (history) {
        history.push("/admin/sell");
      }
    }
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          <Card>
            <CardContent>
              <form onSubmit={this.onSave}>
                <div className="text-xs-center pb-xs">
                  <Typography variant="caption">
                    Đăng nhập để tiếp tục
                  </Typography>
                </div>
                <TextField
                  value={txtUsername}
                  name="txtUsername"
                  onChange={this.onChange}
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  value={txtPassword}
                  name="txtPassword"
                  onChange={this.onChange}
                  label="Password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  type="password"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/signup">
                    <Button>Đăng ký</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
