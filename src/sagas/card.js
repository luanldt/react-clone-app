import { fork, put, take, call, takeLatest, select } from 'redux-saga/effects';
import {
  fetchListCardSuccess,
  createCardFailed,
  createCardSuccess,
  deleteCardFailed,
  deleteCardSuccess,
  updateCardSuccess,
  updateCardFailed,
} from '../actions/card';
import firebase from '../firebase';
import * as cardTypes from '../contants/card';
import { eventChannel } from 'redux-saga';
import snapshotToArray from '../helpers/snapshotToArray';
import sagaWaitFor from '../helpers/sagaWaitFor';

function getCardChannel(uid) {
  if (this.cardChannel) {
    return this.cardChannel;
  }
  this.cardChannel = eventChannel((emit) => {
    const listener = firebase.database().ref(`cards/${uid}`);
    listener.on('value', (snapshot) => {
      emit({ data: snapshot.val() || {} });
    });
    return () => {
      listener.off();
      this.cardChannel = null;
    };
  });
  return this.cardChannel;
}

function* cardChannelSaga() {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const cardChannel = yield call([firebase, getCardChannel], uid);
  while (true) {
    const { data } = yield take(cardChannel);
    if (data) {
      const cards = snapshotToArray(data);
      yield put(fetchListCardSuccess(cards));
    }
  }
}

function* listenerCardData() {
  yield fork(cardChannelSaga);
  yield take(cardTypes.CANCEL_CARD_LISTENER);
  if (firebase.cardChannel) {
    firebase.cardChannel.close();
  }
}

function* createCard({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { listKey, name } = payload.data;
  try {
    const dbCardRef = firebase.database().ref(`cards/${uid}`);
    const dataCardKey = yield call([dbCardRef, dbCardRef.push], 'key');
    const { key } = dataCardKey;
    yield call([dbCardRef, dbCardRef.update], {
      [key]: {
        listKey,
        name,
      },
    });
    yield put(createCardSuccess({ key, name: name, listKey: listKey }));
  } catch (e) {
    yield put(createCardFailed(e));
  }
}

function* updateCard({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { listKey, name, key } = payload.data;
  try {
    const dbCardRef = firebase.database().ref(`cards/${uid}`);
    yield call([dbCardRef, dbCardRef.update], {
      [key]: {
        listKey,
        name,
      },
    });
    yield put(updateCardSuccess({ key, name: name, listKey: listKey }));
  } catch (e) {
    yield put(updateCardFailed(e));
  }
}

function* deleteCard({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { key } = payload.data;
  try {
    const dbCardRef = firebase.database().ref(`cards/${uid}/${key}`);
    yield call([dbCardRef, dbCardRef.remove]);
    yield put(deleteCardSuccess());
  } catch (e) {
    yield put(deleteCardFailed(e));
  }
}

export default [
  takeLatest(cardTypes.CARD_LISTENER, listenerCardData),
  takeLatest(cardTypes.CREATE_CARD, createCard),
  takeLatest(cardTypes.UPDATE_CARD, updateCard),
  takeLatest(cardTypes.DELETE_CARD, deleteCard),
];
