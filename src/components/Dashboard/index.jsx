import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import Header from './Header';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Dashboard extends Component {
  render() {
    const { classes, children, authed, logout } = this.props;
    return (
      <div className={classes.root}>
        <Header authed={authed} logout={logout} />
        <div className={classes.contentWrapper}>{children}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
  authed: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withStyles(styles))(Dashboard);
