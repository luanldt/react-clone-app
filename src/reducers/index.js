import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import ui from "./ui";
import post from "./post";

const rootReducer = combineReducers({
  auth,
  ui,
  post,
  form: formReducer,
});

export default rootReducer;
