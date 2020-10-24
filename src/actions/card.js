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
