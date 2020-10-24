import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  AccountCircle,
  Mail as MailIcon,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as authActions from '../../../actions/auth';
import styles from './styles';

class Header extends Component {
  state = {
    menuId: 'primary-search-account-menu',
    mobileMenuId: 'primary-search-account-menu-mobile',
    anchorEl: null,
    isMenuOpen: false,
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleLogout = () => {
    const { authActionCreators } = this.props;
    const { logout } = authActionCreators;
    if (logout) {
      logout();
    }
  };

  /**
   * Render Menu
   */
  renderMenu = () => {
    const { menuId, anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  /** handle profile menu open */
  handleProfileMenuOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  /** handle mobile menu open */
  handleMobileMenuOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  render() {
    const { classes } = this.props;
    const { menuId, mobileMenuId } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
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
  authActionCreators: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({});

const mapDispathToProps = (dispatch, props) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispathToProps);

export default compose(withConnect, withStyles(styles))(Header);
