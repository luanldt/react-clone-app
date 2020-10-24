import { fork, put, take, call } from 'redux-saga/effects';
import { fetchListCardFailed, fetchListCardSuccess } from '../actions/card';
import firebase from '../firebase';
import * as cardTypes from '../contants/card';

function* fetchAllCards() {
  yield take(cardTypes.FETCH_CARD);

  try {
    const myCard = firebase.database().ref('cards/');
    const data = yield call([myCard, myCard.once], 'value');
    const myCardFromDB = data.val();

    if (myCardFromDB) {
      const cards = Object.keys(myCardFromDB).map((key) => ({
        key: key,
        name: myCardFromDB[key].name,
        listKey: myCardFromDB[key].listKey,
      }));
      yield put(fetchListCardSuccess(cards));
    }
  } catch (e) {
    yield put(fetchListCardFailed(e));
  }
}

export default [fork(fetchAllCards)];
