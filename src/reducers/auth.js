import * as authContants from "../contants/auth";

const initialState = {
  authed: false,
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  console.log('Action: ', action);
  switch (action.type) {
    case authContants.REGISTER: {
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authContants.REGISTER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        authed: true,
        currentUser: data,
      };
    }
    case authContants.REGISTER_FAILURE: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authContants.LOGIN: {
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authContants.LOGIN_SUCCESS: {
      const { data } = action.payload;
      const { currentUser } = data;
      return {
        ...state,
        authed: true,
        currentUser: currentUser,
      };
    }
    case authContants.LOGIN_FAILURE: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authContants.LOGOUT: {
      return {
        ...state
      };
    }
    case authContants.LOGOUT_SUCCESS: {
      // eslint-disable-next-line no-unused-vars
      const { data } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authContants.LOGOUT_FAILURE: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
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
