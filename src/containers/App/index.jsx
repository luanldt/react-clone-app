import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import AppRouter from '../../commons/Router';
import theme from '../../commons/Theme';
import configureStore from '../../redux/configureStore';
import firebase from './../../firebase';

const store = configureStore();

class App extends React.Component {
  state = {
    authed: true,
    loading: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loading: false,
          authed: false,
        });
      });
  };

  register = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            console.error('Register success', user);
            resolve(user);
          })
          .catch((e) => {
            console.error('Register fail', e);
            reject(e);
          });
      } catch (e) {
        console.error('Register fail', e);
        reject(e);
      }
    });
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AppRouter />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
