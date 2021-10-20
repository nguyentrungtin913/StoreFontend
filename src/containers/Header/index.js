import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
import * as authActions from "./../../actions/auth";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { withRouter } from "react-router";

const menuId = "primary-search-account-menu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleProfileMenuOpen = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleLogout = () => {
    const { authActionCreators } = this.props;
    const { logout } = authActionCreators;
    logout();
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    );
  };

  handleToggleSidebar = () => {
    const { showSidebar, onToggleSidebar } = this.props;
    if (onToggleSidebar) {
      onToggleSidebar(!showSidebar);
    }
  };

  render() {
    const { classes, name, logout } = this.props;
    if (logout === true) {
      const { history } = this.props;
      if (history) {
        history.push("/login");
      }
    }
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleToggleSidebar}
            >
              <MenuIcon fontSize="large"  />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {name}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle  fontSize="large"   />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMenu()}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => {
  return {
    logout: state.auth.logout
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActionCreators: bindActionCreators(authActions, dispatch)
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect, withRouter)(Header);
