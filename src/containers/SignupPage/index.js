import React, { Component } from "react";
import styles from "./styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SignupPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <Typography variant="caption">Đăng ký</Typography>
                </div>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  type="password"
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  type="password"
                />
                <FormControlLabel
                  control={<Checkbox value="agree" />}
                  label="Tôi đồng ý"
                  className={classes.fullWidth}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Signup
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/login">
                    <Button>Đã có tài khoản ?</Button>
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
SignupPage.propTypes = {
  classes: PropTypes.object
};
export default withStyles(styles)(SignupPage);
