import * as postContants from "../contants/post";

const initialState = {
  /* current posts */
  posts: [],
  lastKey: null,
};

const reducer = (state = initialState, action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case postContants.UPLOAD: {
      return {
        ...state,
      };
    }
    case postContants.UPLOAD_SUCCESS: {
      // eslint-disable-next-line no-unused-vars
      const { data } = action.payload;
      return {
        ...state,
      };
    }
    case postContants.UPLOAD_FAILURE: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
      };
    }
    case postContants.FETCH_LIST: {
      return {
        ...state,
      };
    }
    case postContants.FETCH_LIST_SUCCESS: {
      // eslint-disable-next-line no-unused-vars
      const { data } = action.payload;
      const { data: listData, lastKey } = data;
      return {
        ...state,
        posts: [...state.posts, ...listData],
        lastKey: lastKey,
      };
    }
    case postContants.FETCH_LIST_FAILURE: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
