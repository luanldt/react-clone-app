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
