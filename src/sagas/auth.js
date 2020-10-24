import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import {
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerSuccess,
} from '../actions/auth';
import * as authTypes from '../contants/auth';
import firebase from '../firebase';

function getAuthChannel() {
  if (!this.authChannel) {
    this.authChannel = eventChannel((emit) => {
      const unsubscribe = firebase
        .auth()
        .onAuthStateChanged((user) => emit({ user }));
      return unsubscribe;
    });
  }
  return this.authChannel;
}

function* firebaseAuthChannelSaga() {
  const authChannel = yield call([{}, getAuthChannel]);
  while (true) {
    const result = yield take(authChannel);
    const { user } = result;
    if (user) {
      yield put(loginSuccess({ authed: true, currentUser: user }));
    } else {
      yield put(logoutSuccess());
    }
  }
}

function* login({ payload }) {
  const { email, password } = payload;
  const auth = firebase.auth();
  try {
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
  } catch (e) {
    yield put(loginFailed(e));
  }
}

function* register({ payload }) {
  const { email, password } = payload;
  const auth = firebase.auth();
  try {
    const data = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
    );
    if (data.user) {
      yield put(registerSuccess({ authed: true, currentUser: data.user }));
    } else {
      yield put(registerFailed(data));
    }
  } catch (e) {
    yield put(registerFailed(e));
  }
}

function* logout() {
  const auth = firebase.auth();
  try {
    yield call([auth, auth.signOut]);
  } catch (e) {
    yield put(logoutFailed());
  }
}

export default [
  fork(firebaseAuthChannelSaga),
  takeLatest(authTypes.LOGIN, login),
  takeLatest(authTypes.REGISTER, register),
  takeLatest(authTypes.LOGOUT, logout),
];
