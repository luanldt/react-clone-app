import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import AppRouter from '../../commons/Router';
import theme from '../../commons/Theme';
import configureStore from '../../redux/configureStore';
import { ToastContainer } from 'react-toastify';

const store = configureStore();

class App extends React.Component {
  state = {
    authed: true,
    loading: false,
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AppRouter />
            <ToastContainer />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
