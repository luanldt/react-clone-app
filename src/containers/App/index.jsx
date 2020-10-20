import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../commons/Theme';
import HomePage from '../HomePage';
import { CssBaseline } from '@material-ui/core';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Dashboard from '../../components/Dashboard';
import SigninPage from '../SigninPage';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <SigninPage />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    );
  }
}

App.propTypes = {};

export default App;
