import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as authActions from '../../actions/auth';
import styles from './styles';

class SigninPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { email, password } = this.state;
    const { authActionCreators } = this.props;
    const { login } = authActionCreators;
    if (!email || !password) {
      return;
    }
    if (login) {
      login({ email, password });
    }
  };

  _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, authed } = this.props;
    const { email, password } = this.state;
    return (
      <div className={classes.root}>
        {authed && <Redirect to="/board" />}
        <Card className={classes.loginWrapper}>
          <CardHeader
            title="Login"
            className={classes.title}
            action={
              <Link to="/register">
                <Button
                  color="primary"
                  className={classes.buttonRegister}
                  variant="contained"
                  size="large"
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Link>
            }
          />
          <CardContent>
            <form onSubmit={this.handleLogin}>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={this._handleChange}
                />
                {/* {(errorCode.indexOf('email') !== -1 ||
                  errorCode.indexOf('user') !== -1) && (
                  <FormHelperText component="p" error>
                    {errorMessage}
                  </FormHelperText>
                )} */}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  password="password"
                  value={password}
                  onChange={this._handleChange}
                />
                {/* {errorCode.indexOf('auth/wrong-password') !== -1 && (
                  <FormHelperText component="p" error>
                    {errorMessage}
                  </FormHelperText>
                )} */}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                className={classes.linkRegister}
              >
                <Link to="/register">
                  <Button variant="text">I don&apos;t have account?</Button>
                </Link>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

SigninPage.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  login: PropTypes.func,
  authActionCreators: PropTypes.shape({
    login: PropTypes.func,
  }),
  authed: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});
const mapDispatchToProps = (dispatch, props) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, withStyles(styles))(SigninPage);
