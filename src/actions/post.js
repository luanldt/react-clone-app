import * as postTypes from "../contants/post";

export const upload = (data) => ({
  type: postTypes.UPLOAD,
  payload: {
    data,
  },
});

export const uploadSuccess = (data) => ({
  type: postTypes.UPLOAD_SUCCESS,
  payload: {
    data,
  },
});

export const uploadFailure = (error) => ({
  type: postTypes.UPLOAD_FAILURE,
  payload: {
    error,
  },
});

export const fetchListPost = (data) => ({
  type: postTypes.FETCH_LIST,
  payload: {
    data,
  },
});

export const fetchListPostSuccess = (data) => ({
  type: postTypes.FETCH_LIST_SUCCESS,
  payload: {
    data,
  },
});

export const fetchListPostFailure = (error) => ({
  type: postTypes.FETCH_LIST_FAILURE,
  payload: {
    error,
  },
});

export const deletePost = (data) => ({
  type: postTypes.DELETE_POST,
  payload: {
    data,
  },
});

export const deletePostSuccess = (data) => ({
  type: postTypes.DELETE_POST_SUCCESS,
  payload: {
    data,
  },
});

export const deletePostFailure = (error) => ({
  type: postTypes.DELETE_POST_FAILURE,
  payload: {
    error,
  },
});

export const likePost = (data) => ({
  type: postTypes.LIKE_POST,
  payload: {
    data,
  },
});

export const likePostSuccess = (data) => ({
  type: postTypes.LIKE_POST_SUCCESS,
  payload: {
    data,
  },
});

export const likePostFailure = (error) => ({
  type: postTypes.LIKE_POST_FAILURE,
  payload: {
    error,
  },
});

export const commentPost = (data) => ({
  type: postTypes.COMMENT_POST,
  payload: {
    data,
  },
});

export const commentPostSuccess = (data) => ({
  type: postTypes.COMMENT_POST_SUCCESS,
  payload: {
    data,
  },
});

export const commentPostFailure = (error) => ({
  type: postTypes.COMMENT_POST_FAILURE,
  payload: {
    error,
  },
});
