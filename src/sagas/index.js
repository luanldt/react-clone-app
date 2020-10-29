import { all } from 'redux-saga/effects';

function* rootSaga() {
	yield all([]);
	console.log('Root saga');
}

export default rootSaga;