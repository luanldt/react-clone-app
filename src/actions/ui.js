import * as uiTypes from "../contants/ui";

export const setProgress = (data) => ({
  type: uiTypes.SET_PROCESS,
  payload: {
    data,
  },
});
