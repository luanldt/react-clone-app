import { all } from 'redux-saga/effects';

import card from './card';
import auth from './auth';

function* rootSaga() {
  yield all([...card, ...auth]);
}

export default rootSaga;
