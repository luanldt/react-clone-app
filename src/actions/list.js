import * as listContants from '../contants/list';

export const fetchList = (params = {}) => ({
  type: listContants.FETCH_LIST,
  payload: {
    ...params,
  },
});

export const fetchListSuccess = (data) => ({
  type: listContants.FETCH_LIST_SUCCESS,
  payload: {
    data,
  },
});

export const fetchListFailed = (error) => ({
  type: listContants.FETCH_LIST_FAILED,
  payload: {
    error,
  },
});

export const createList = (data) => ({
  type: listContants.CREATE_LIST,
  payload: {
    data,
  },
});

export const createListSuccess = (data) => ({
  type: listContants.CREATE_LIST_SUCCESS,
  payload: {
    data,
  },
});

export const createListFailed = (error) => ({
  type: listContants.CREATE_LIST_FAILED,
  payload: {
    error,
  },
});

export const updateList = (data) => ({
  type: listContants.UPDATE_LIST,
  payload: {
    data,
  },
});

export const updateListSuccess = (data) => ({
  type: listContants.UPDATE_LIST_SUCCESS,
  payload: {
    data,
  },
});

export const updateListFailed = (error) => ({
  type: listContants.UPDATE_LIST_FAILED,
  payload: {
    error,
  },
});

export const deleteList = (data) => ({
  type: listContants.DELETE_LIST,
  payload: {
    data,
  },
});

export const deleteListSuccess = (data) => ({
  type: listContants.DELETE_LIST_SUCCESS,
  payload: {
    data,
  },
});

export const deleteListFailed = (error) => ({
  type: listContants.DELETE_LIST_FAILED,
  payload: {
    error,
  },
});

export const listenListData = () => ({
  type: listContants.LIST_LISTENER,
});

export const cancelListenListData = () => ({
  type: listContants.CANCEL_LIST_LISTENER,
});
