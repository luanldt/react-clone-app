import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  TextField,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import AddIcon from '@material-ui/icons/Add';
import firebase from '../../firebase';

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('Current user: ', user);
    });
  }

  handleLogin = async () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return;
    }
    try {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then((user) => {
              console.log(user);
            });
        });
    } catch (e) {
      console.error('Signin firebase username password error: ', e);
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
    const { classes } = this.props;
    const { username, password } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.loginWrapper}>
          <CardHeader
            title="Login"
            className={classes.title}
            action={
              <Button
                color="primary"
                className={classes.buttonRegister}
                variant="contained"
                size="large"
              >
                <AddIcon fontSize="large" />
              </Button>
            }
          />
          <CardContent>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Username"
                name="username"
                value={username}
                onChange={this._handleChange}
              />
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
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              className={classes.linkRegister}
            >
              <Button variant="text">I don&apos;t have account?</Button>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
}

SigninPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SigninPage);
