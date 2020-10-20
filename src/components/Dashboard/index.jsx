import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import HomePage from '../../containers/HomePage';
import Header from './Header';
import styles from './styles';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.contentWrapper}>
          <HomePage />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Dashboard);
