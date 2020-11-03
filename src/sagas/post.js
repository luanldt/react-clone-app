import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { upload, uploadFailure, uploadSuccess } from "../actions/post";
import * as postTypes from "../contants/post";
import {
  getURLDownload,
  savePost,
  updatePostFile,
  uploadPostFile,
} from "../firebase";

function* uploadPost({ payload }) {
  const { uid } = yield select((state) => state.auth.currentUser);

  try {
    const { content, files } = payload.data;
    const data = yield call(savePost, {
      uid,
      content,
    });
    const postKey = data;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      yield call(uploadPostFile, {
        uid,
        post: postKey,
        fileName: file.file.name,
        fileContent: file.file,
      });
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
    }
    yield put(uploadSuccess(data));
  } catch (e) {
    yield put(uploadFailure(e));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [takeLatest(postTypes.UPLOAD, uploadPost)];
