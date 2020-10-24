import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import PersonIcon from '@material-ui/icons/Person';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as authActions from '../../actions/auth';

class SigninPage extends Component {
  state = {
    email: '',
    password: '',
    rePassword: '',
    confirmTerm: false,
  };

  componentDidMount() {}

  handleRegister = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { email, password, rePassword, confirmTerm } = this.state;
    const { authActionCreators } = this.props;
    const { register } = authActionCreators;
    if (!email || !password || !rePassword || !confirmTerm) {
      return;
    }
    if (register) {
      register({ email, password });
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
    const { email, password, rePassword, confirmTerm } = this.state;
    return (
      <div className={classes.root}>
        {authed && <Redirect to="/login" />}
        <Card className={classes.registerWrapper}>
          <CardHeader
            title="Register"
            className={classes.title}
            action={
              <Link to="/login">
                <Button
                  color="primary"
                  className={classes.buttonLogin}
                  variant="contained"
                  size="large"
                >
                  <PersonIcon fontSize="large" />
                </Button>
              </Link>
            }
          />
          <CardContent>
            <form onSubmit={this.handleRegister}>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={this._handleChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={this._handleChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="password"
                  label="Re-confirm password"
                  name="rePassword"
                  value={rePassword}
                  onChange={this._handleChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormControlLabel
                  value={confirmTerm}
                  name="confirmTerm"
                  onChange={this._handleChange}
                  control={<Checkbox color="primary" />}
                  label="I have read and confirm term"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="primary"
                  disabled={!(password === rePassword && confirmTerm && email)}
                >
                  Register
                </Button>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                className={classes.linkLogin}
              >
                <Link to="/login">
                  <Button variant="text">I have account?</Button>
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
  register: PropTypes.func,
  authActionCreators: PropTypes.shape({
    register: PropTypes.func,
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
