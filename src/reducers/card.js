import * as cardContants from '../contants/card';
import { toastSuccess, toastError } from '../helpers/toastifyHelper';

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
      const { error } = action.payload;
      toastError(`Fetch card error ${error}!`);
      return {
        ...state,
        cards: [],
      };
    }
    case cardContants.CREATE_CARD: {
      return {
        ...state,
      };
    }
    case cardContants.CREATE_CARD_SUCCESS: {
      toastSuccess('Create card success!');
      return {
        ...state,
      };
    }
    case cardContants.CREATE_CARD_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      toastError(`Create card error ${error}!`);
      return {
        ...state,
      };
    }
    case cardContants.UPDATE_CARD: {
      return {
        ...state,
      };
    }
    case cardContants.UPDATE_CARD_SUCCESS: {
      toastSuccess('Update card success!');
      return {
        ...state,
      };
    }
    case cardContants.UPDATE_CARD_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      toastError(`Update card error ${error}!`);
      return {
        ...state,
      };
    }
    case cardContants.DELETE_CARD: {
      return {
        ...state,
      };
    }
    case cardContants.DELETE_CARD_SUCCESS: {
      toastSuccess('Delete card success!');
      return {
        ...state,
      };
    }
    case cardContants.DELETE_CARD_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      toastError(`Delete card error ${error}!`);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
