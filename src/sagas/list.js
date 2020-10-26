import { fork, put, take, call, takeLatest, select } from 'redux-saga/effects';
import {
  createListFailed,
  createListSuccess,
  deleteListFailed,
  deleteListSuccess,
  fetchListSuccess,
} from '../actions/list';
import firebase from '../firebase';
import * as listTypes from '../contants/list';
import { eventChannel } from 'redux-saga';
import snapshotToArray from '../helpers/snapshotToArray';
import sagaWaitFor from '../helpers/sagaWaitFor';
import { deleteCard } from '../actions/card';

function getListChannel(uid) {
  if (this.listChannel) {
    return this.listChannel;
  }
  this.listChannel = eventChannel((emit) => {
    const listener = firebase.database().ref(`lists/${uid}`);
    listener.on('value', (snapshot) => {
      emit({ data: snapshot.val() || {} });
    });
    return () => {
      listener.off();
      this.listChannel = null;
    };
  });
  return this.listChannel;
}

function* listChannelSaga() {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const listChannel = yield call([firebase, getListChannel], uid);
  while (true) {
    const { data } = yield take(listChannel);
    if (data) {
      const lists = snapshotToArray(data);
      yield put(fetchListSuccess(lists));
    }
  }
}

function* listenerListData() {
  yield fork(listChannelSaga);
  yield take(listTypes.CANCEL_LIST_LISTENER);
  if (firebase.listChannel) {
    firebase.listChannel.close();
  }
}

function* createList({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { name } = payload.data;
  try {
    const dbListRef = firebase.database().ref(`lists/${uid}`);
    const dataListKey = yield call([dbListRef, dbListRef.push], 'key');
    const { key } = dataListKey;
    yield call([dbListRef, dbListRef.update], {
      [key]: {
        name,
      },
    });
    yield put(createListSuccess({ key, name: name }));
  } catch (e) {
    yield put(createListFailed(e));
  }
}

function* updateList({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { name, key } = payload.data;
  try {
    const dbListRef = firebase.database().ref(`lists/${uid}`);
    yield call([dbListRef, dbListRef.update], {
      [key]: {
        name,
      },
    });
    yield put(createListSuccess({ key, name: name }));
  } catch (e) {
    yield put(createListFailed(e));
  }
}

function* deleteList({ payload }) {
  yield call(sagaWaitFor, (state) => state.auth.currentUser != null);
  const currentUser = yield select((state) => state.auth.currentUser);
  const { uid } = currentUser;
  const { key } = payload.data;
  try {
    const cards = yield select((state) => state.card.cards);
    if (cards) {
      const cardDeletes = cards.filter((c) => c.listKey === key);
      for (var i = 0; i < cardDeletes.length; i++) {
        const card = cardDeletes[i];
        yield put(deleteCard(card));
      }
    }

    const dbListRef = firebase.database().ref(`lists/${uid}/${key}`);
    yield call([dbListRef, dbListRef.remove]);
    yield put(deleteListSuccess());
  } catch (e) {
    yield put(deleteListFailed(e));
  }
}

export default [
  takeLatest(listTypes.LIST_LISTENER, listenerListData),
  takeLatest(listTypes.CREATE_LIST, createList),
  takeLatest(listTypes.UPDATE_LIST, updateList),
  takeLatest(listTypes.DELETE_LIST, deleteList),
];
