import { all } from 'redux-saga/effects';

import card from './card';
import auth from './auth';
import list from './list';

function* rootSaga() {
  yield all([...list, ...card, ...auth]);
}

export default rootSaga;
