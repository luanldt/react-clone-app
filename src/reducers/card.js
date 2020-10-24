import * as cardContants from '../contants/card';

const initialState = {
  cards: [],
};

const reducer = (state = initialState, action) => {
  console.log('Action: ', action);
  switch (action.type) {
    case cardContants.FETCH_CARD: {
      return {
        ...state,
        cards: [],
      };
    }
    case cardContants.FETCH_CARD_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        cards: data,
      };
    }
    case cardContants.FETCH_CARD_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        cards: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
