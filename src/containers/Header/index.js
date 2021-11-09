import { Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import * as authActions from "./../../actions/auth";
import { ADMIN_ROUTES } from "./../../constants";
import styles from "./styles";


const menuId = "primary-search-account-menu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      left: false,
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

  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  list = (anchor) => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={this.toggleDrawer(anchor, false)}
        onKeyDown={this.toggleDrawer(anchor, false)}
      >
        <Divider />
        <List>
          {ADMIN_ROUTES.map(item => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
              >
                <ListItem className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </Box>
    );
    return xhtml;
  }
  render() {
    const { classes, name, logout } = this.props;
    if (logout === true) {
      const { history } = this.props;
      if (history) {
        history.push("/admin/login");
      }
    }
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <React.Fragment key={"left"}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
                onClick={this.toggleDrawer("left", true)}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={this.state["left"]}
                onClose={this.toggleDrawer("left", false)}
              >
                {this.list("left")}
              </Drawer>
            </React.Fragment>
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
                <AccountCircle fontSize="large" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMenu()}
      </div >
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
