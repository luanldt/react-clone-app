import React from "react";
import PropTypes from "prop-types";
import configureStore from "../../redux/configureStore";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../../commons/Theme";
import HomePage from "../HomePage/index";
import CustomModal from "../../components/CustomModal";
import AppRouter from '../../commons/AppRouter';

const store = configureStore();

function App(props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppRouter />
          <CustomModal />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {};

export default App;
