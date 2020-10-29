import React from "react";
import PropTypes from "prop-types";
import configureStore from "../../redux/configureStore";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../../commons/Theme";
import HomePage from "../HomePage/index";
import CustomModal from "../../components/CustomModal";
import SigninPage from '../SigninPage/index';

const store = configureStore();

function App(props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <SigninPage />
          <CustomModal />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {};

export default App;
