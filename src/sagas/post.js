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
  deletePostSuccess,
  fetchListPostFailure,
  fetchListPostSuccess,
  uploadFailure,
  uploadSuccess,
  likePostFailure,
  likePostSuccess,
  commentPostSuccess,
  commentPostFailure,
} from "../actions/post";
import { setProgress } from "../actions/ui";
import * as postTypes from "../contants/post";
import {
  getURLDownload,
  savePost,
  updatePostFile,
  uploadPostFile,
  fetchListPost as fetchListPostFirebase,
  deletePost as deletePostFirebase,
  likePost as likePostFirebase,
  getUserByUID,
  checkLikePost,
  commentPost as commentPostFirebase,
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
    const data = { content };
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
      data.files = [
        {
          fileName: file.file.name,
          fileURL: downloadURL,
        },
      ];
      const userSnapshot = yield call(getUserByUID, { uid });
      const userSnapshotData = yield call(
        [userSnapshot, userSnapshot.once],
        "value"
      );
      const user = snapshotToArray([userSnapshotData.val()])[0];
      data.user = user;
      yield put(setProgress(0));
    }
    yield put(uploadSuccess(data));
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
    let data = [];
    let newLastKey = lastKey;
    if (dataSnapshot) {
      data = snapshotToArray(dataSnapshot.val());
      if (data.length > 0) {
        newLastKey = data[data.length - 1].key;
        // user
        const userSnapshot = yield call(getUserByUID, { uid });
        const userSnapshotData = yield call(
          [userSnapshot, userSnapshot.once],
          "value"
        );
        const user = snapshotToArray([userSnapshotData.val()])[0];
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          d.user = user;
          d.numberLike = d.likes.length ? d.numberLike : 0;
          // like
          const likeSnapshot = yield call(checkLikePost, { uid, key: d.key });
          const likeSnapshotData = yield call(
            [likeSnapshot, likeSnapshot.once],
            "value"
          );
          d.liked = likeSnapshotData.val();
          // process file
          if (d.files) {
            d.files = snapshotToArray(d.files);
          }
          d.numberComment = 0;
          if (d.comments) {
            d.comments = snapshotToArray(d.comments);
            d.numberComment = d.comments.length;
            let newComments = [];
            for (let indexComment = 0; indexComment < 2; indexComment++) {
              const comment = d.comments[indexComment];
              const userSnapshot = yield call(getUserByUID, {
                uid: comment.uid,
              });
              const userSnapshotData = yield call(
                [userSnapshot, userSnapshot.once],
                "value"
              );
              const user = snapshotToArray([userSnapshotData.val()])[0];
              comment.user = user;
              newComments = [...newComments, ...[comment]];
            }
            d.comments = newComments;
          }
        }
        data.reverse();
      }
    }
    yield put(fetchListPostSuccess({ data, lastKey: newLastKey }));
    yield posts;
  } catch (e) {
    yield put(fetchListPostFailure(e));
  }
}

function* deletePost({ payload }) {
  const { key } = payload.data;
  const { uid } = yield select((state) => state.auth.currentUser);
  try {
    const data = yield call(deletePostFirebase, {
      uid,
      key,
    });
    yield put(deletePostSuccess(data));
  } catch (e) {
    yield put(fetchListPostFailure(e));
  }
}

function* likePost({ payload }) {
  const { key } = payload.data;
  const { uid } = yield select((state) => state.auth.currentUser);
  try {
    yield call(likePostFirebase, {
      uid,
      key,
    });
    yield put(likePostSuccess({ key }));
  } catch (e) {
    yield put(likePostFailure(e));
  }
}

function* commentPost({ payload }) {
  const { uid } = yield select((state) => state.auth.currentUser);
  const { key, content } = payload.data;
  try {
    yield call(commentPostFirebase, {
      uid,
      key,
      content,
    });
    yield put(commentPostSuccess());
  } catch (e) {
    yield put(commentPostFailure(e));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(postTypes.UPLOAD, uploadPost),
  takeLeading(postTypes.FETCH_LIST, fetchListPost),
  takeLeading(postTypes.DELETE_POST, deletePost),
  takeLeading(postTypes.LIKE_POST, likePost),
  takeLeading(postTypes.COMMENT_POST, commentPost),
];
