import { select, take } from 'redux-saga/effects';

function* sagaWaitFor(selector) {
  if (yield select(selector)) return;
  while (true) {
    yield take('*');
    if (yield select(selector)) return;
  }
}

export default sagaWaitFor;
