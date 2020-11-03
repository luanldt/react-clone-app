import * as authContants from "../contants/auth";

export const register = (data) => ({
  type: authContants.REGISTER,
  payload: {
    data,
  },
});

export const registerSuccess = (data) => ({
  type: authContants.REGISTER_SUCCESS,
  payload: {
    data,
  },
});

export const registerFailure = (error) => ({
  type: authContants.REGISTER_FAILURE,
  payload: {
    error,
  },
});

export const login = (data) => ({
  type: authContants.LOGIN,
  payload: {
    data,
  },
});

export const loginSuccess = (data) => ({
  type: authContants.LOGIN_SUCCESS,
  payload: {
    data,
  },
});

export const loginFailure = (error) => ({
  type: authContants.LOGIN_FAILURE,
  payload: {
    error,
  },
});

export const loginWithGoogle = (data) => ({
  type: authContants.LOGIN_WITH_GOOGLE,
});

export const loginWithFacebook = (data) => ({
  type: authContants.LOGIN_WITH_FACEBOOK,
});

export const logout = () => ({
  type: authContants.LOGOUT,
});

export const logoutSuccess = (data) => ({
  type: authContants.LOGOUT_SUCCESS,
  payload: {
    data,
  },
});

export const logoutFailure = (error) => ({
  type: authContants.LOGOUT_FAILURE,
  payload: {
    error,
  },
});
