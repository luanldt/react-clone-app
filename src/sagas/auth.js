import * as authContants from "../contants/auth";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithFacebookPopup,
  saveUser,
  signOut,
} from "../firebase";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
} from "../actions/auth";
import { eventChannel } from "redux-saga";

function getAuthChannel() {
  if (!this.authChannel) {
    this.authChannel = eventChannel((emit) => {
      const listener = onAuthStateChanged((user) => emit({ user }));
      return () => {
        listener.off();
      };
    });
  }
  return this.authChannel;
}

function* authChannelSaga() {
  const authChannel = yield call([{}, getAuthChannel]);
  while (true) {
    const result = yield take(authChannel);
    const { user } = result;
    if (user) {
      yield put(loginSuccess({ authed: true, currentUser: user }));
    } else {
      yield put(logoutSuccess({ authed: false, currentUser: null }));
    }
  }
}

function* register({ payload }) {
  const { email, password, username, phone } = payload.data;
  try {
    const data = yield call(createUserWithEmailAndPassword, email, password);
    console.log(data);
    if (data.user) {
      yield call(saveUser, {
        displayName: "",
        uid: data.user.uid,
        username,
        phone,
        email,
        photoURL: "",
      });
      yield put(registerSuccess({ authed: true, currentUser: data.user }));
    } else {
      yield put(registerFailure(data));
    }
  } catch (e) {
    yield put(registerFailure(e));
  }
}

function* login({ payload }) {
  const { email, password } = payload.data;
  try {
    const data = yield call(signInWithEmailAndPassword, email, password);
    if (!data.user) {
      yield put(loginFailure(data));
    }
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* loginWithGoogle() {
  try {
    const data = yield call(signInWithGooglePopup);
    if (!data.user) {
      yield put(loginFailure(data));
    }
    console.log(data.user);
    const { uid, email, displayName, phoneNumber, photoURL } = data.user;
    yield call(saveUser, {
      displayName: displayName,
      uid: uid,
      username: email,
      phone: phoneNumber,
      email: email,
      photoURL: photoURL,
    });
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* loginWithFacebook() {
  try {
    const data = yield call(signInWithFacebookPopup);
    if (!data.user) {
      yield put(loginFailure(data));
    }
    console.log(data.user);
    const { uid, email, displayName, phoneNumber, photoURL } = data.user;
    yield call(saveUser, {
      displayName: displayName,
      uid: uid,
      username: email,
      phone: phoneNumber,
      email: email,
      photoURL: photoURL,
    });
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* logout() {
  try {
    yield call(signOut);
  } catch (e) {
    yield put(logoutFailure(e));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  fork(authChannelSaga),
  takeLatest(authContants.REGISTER, register),
  takeLatest(authContants.LOGIN, login),
  takeLatest(authContants.LOGIN_WITH_GOOGLE, loginWithGoogle),
  takeLatest(authContants.LOGIN_WITH_FACEBOOK, loginWithFacebook),
  takeLatest(authContants.LOGOUT, logout),
];
