import { all } from "redux-saga/effects";
import auth from "./auth";
import post from "./post";

function* rootSaga() {
  yield all([...auth, ...post]);
  console.log("Root saga");
}

export default rootSaga;
