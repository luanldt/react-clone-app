import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import AppRouter from "../../commons/AppRouter";
import theme from "../../commons/Theme";
import CustomModal from "../../components/CustomModal";
import configureStore from "../../redux/configureStore";

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
