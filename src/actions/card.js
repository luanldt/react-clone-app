import * as cardContants from '../contants/card';

export const fetchListCard = (params = {}) => ({
  type: cardContants.FETCH_CARD,
  payload: {
    params,
  },
});

export const fetchListCardSuccess = (data) => ({
  type: cardContants.FETCH_CARD_SUCCESS,
  payload: {
    data,
  },
});

export const fetchListCardFailed = (error) => ({
  type: cardContants.FETCH_CARD_FAILED,
  payload: {
    error,
  },
});

export const createCard = (data) => ({
  type: cardContants.CREATE_CARD,
  payload: {
    data,
  },
});

export const createCardSuccess = (data) => ({
  type: cardContants.CREATE_CARD_SUCCESS,
  payload: {
    data,
  },
});

export const createCardFailed = (error) => ({
  type: cardContants.CREATE_CARD_FAILED,
  payload: {
    error,
  },
});

export const updateCard = (data) => ({
  type: cardContants.UPDATE_CARD,
  payload: {
    data,
  },
});

export const updateCardSuccess = (data) => ({
  type: cardContants.UPDATE_CARD_SUCCESS,
  payload: {
    data,
  },
});

export const updateCardFailed = (error) => ({
  type: cardContants.UPDATE_CARD_FAILED,
  payload: {
    error,
  },
});

export const deleteCard = (data) => ({
  type: cardContants.DELETE_CARD,
  payload: {
    data,
  },
});

export const deleteCardSuccess = (data) => ({
  type: cardContants.DELETE_CARD_SUCCESS,
  payload: {
    data,
  },
});

export const deleteCardFailed = (error) => ({
  type: cardContants.DELETE_CARD_FAILED,
  payload: {
    error,
  },
});

export const listenCardData = () => ({
  type: cardContants.CARD_LISTENER,
});

export const cancelListenCardData = () => ({
  type: cardContants.CANCEL_CARD_LISTENER,
});
