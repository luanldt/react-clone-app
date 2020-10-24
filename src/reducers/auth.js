import * as authTypes from '../contants/auth';

const intialState = {
  authed: false,
  currentUser: null,
};

const reducer = (state = intialState, action) => {
  console.log('Action: ', action);
  switch (action.type) {
    case authTypes.LOGIN: {
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authTypes.LOGIN_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        authed: true,
        currentUser: data,
      };
    }
    case authTypes.LOGIN_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authTypes.REGISTER: {
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authTypes.REGISTER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        authed: true,
        currentUser: data,
      };
    }
    case authTypes.REGISTER_FAILED: {
      // eslint-disable-next-line no-unused-vars
      const { error } = action.payload;
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authTypes.LOGOUT: {
      return {
        ...state,
      };
    }
    case authTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        authed: false,
        currentUser: null,
      };
    }
    case authTypes.LOGOUT_FAILED: {
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
