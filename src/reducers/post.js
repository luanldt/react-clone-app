import * as postContants from "../contants/post";

const initialState = {};

const reducer = (state = initialState, action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case postContants.UPLOAD: {
      return {
        ...state,
      };
    }
    case postContants.UPLOAD_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
      };
    }
    case postContants.UPLOAD_FAILURE: {
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
