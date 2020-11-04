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
