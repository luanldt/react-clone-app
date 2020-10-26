import * as listContants from '../contants/list';
import { toastError, toastSuccess } from '../helpers/toastifyHelper';

const initialState = {
  lists: [],
};

const reducer = (state = initialState, action) => {
  console.log('Action: ', action);
  switch (action.type) {
    case listContants.FETCH_LIST: {
      return {
        ...state,
        lists: [],
      };
    }
    case listContants.FETCH_LIST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        lists: data,
      };
    }
    case listContants.FETCH_LIST_FAILED: {
      const { error } = action.payload;
      toastError(`Fetch list error ${error}!`);
      return {
        ...state,
        lists: [],
      };
    }
    case listContants.CREATE_LIST: {
      return {
        ...state,
      };
    }
    case listContants.CREATE_LIST_SUCCESS: {
      // const { data } = action.payload;
      toastSuccess('Create list success!');
      return {
        ...state,
      };
    }
    case listContants.CREATE_LIST_FAILED: {
      const { error } = action.payload;
      toastError(`Create list error ${error}!`);
      return {
        ...state,
      };
    }
    case listContants.UPDATE_LIST: {
      return {
        ...state,
      };
    }
    case listContants.UPDATE_LIST_SUCCESS: {
      // const { data } = action.payload;
      toastSuccess('Update list success!');
      return {
        ...state,
      };
    }
    case listContants.UPDATE_LIST_FAILED: {
      const { error } = action.payload;
      toastError(`Update list error ${error}!`);
      return {
        ...state,
      };
    }
    case listContants.DELETE_LIST: {
      return {
        ...state,
      };
    }
    case listContants.DELETE_LIST_SUCCESS: {
      // const { data } = action.payload;
      toastSuccess('Delete list success!');
      return {
        ...state,
      };
    }
    case listContants.DELETE_LIST_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      toastError(`Delete list error ${error}!`);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
