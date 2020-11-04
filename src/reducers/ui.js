import * as uiContants from "../contants/ui";

const initialState = {
  progressPercent: 0,
};

const reducer = (state = initialState, action) => {
  console.log("Action: ", action);
  switch (action.type) {
    case uiContants.SET_PROCESS: {
      let { data } = action.payload;
      data = Math.max(0, data);
      data = Math.min(100, data);
      return {
        ...state,
        progressPercent: data,
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
