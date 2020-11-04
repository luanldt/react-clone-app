import { eventChannel } from "redux-saga";
import {
  call,
  put,
  select,
  take,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  fetchListPostFailure,
  fetchListPostSuccess,
  uploadFailure,
  uploadSuccess,
} from "../actions/post";
import { setProgress } from "../actions/ui";
import * as postTypes from "../contants/post";
import {
  getURLDownload,
  savePost,
  updatePostFile,
  uploadPostFile,
  fetchListPost as fetchListPostFirebase,
} from "../firebase";
import snapshotToArray from "../helpers/snapshotToArray";

function* uploadPost({ payload }) {
  const { uid } = yield select((state) => state.auth.currentUser);

  try {
    const { content, files } = payload.data;
    const postKey = yield call(savePost, {
      uid,
      content,
    });
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const task = uploadPostFile({
        uid,
        post: postKey,
        fileName: file.file.name,
        fileContent: file.file,
      });
      const upload = eventChannel((emit) => {
        task.on("state_changed", emit);
        return () => {
          upload.off();
        };
      });
      while (true) {
        const data = yield take(upload);
        var progress = (data.bytesTransferred / data.totalBytes) * 100;
        yield put(setProgress(progress));
        if (progress === 100) {
          break;
        }
      }
      yield task;
      const downloadURL = yield call(getURLDownload, {
        uid,
        post: postKey,
        fileName: file.file.name,
      });
      yield call(updatePostFile, {
        uid,
        postId: postKey,
        downloadURL,
        fileName: file.file.name,
      });
      yield put(setProgress(0));
    }
    yield put(uploadSuccess(postKey));
  } catch (e) {
    yield put(uploadFailure(e));
  }
}

function* fetchListPost({ payload }) {
  const { uid } = yield select((state) => state.auth.currentUser);
  const { lastKey } = yield select((state) => state.post);
  try {
    const posts = yield call(fetchListPostFirebase, {
      uid,
      lastKey,
    });
    const dataSnapshot = yield call([posts, posts.once], "value");
    let data = snapshotToArray(dataSnapshot.val());
    let newLastKey = lastKey;
    if (data.length > 0) {
      data = data.splice(data.length - 1, 1);
      newLastKey = data[data.length - 1].key;
    }
    yield put(fetchListPostSuccess({ data, lastKey: newLastKey }));
    yield posts;
  } catch (e) {
    yield put(fetchListPostFailure(e));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(postTypes.UPLOAD, uploadPost),
  takeLeading(postTypes.FETCH_LIST, fetchListPost),
];
