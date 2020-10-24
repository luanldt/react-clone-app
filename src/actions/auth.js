import * as authTypes from '../contants/auth';

export const login = (params) => ({
  type: authTypes.LOGIN,
  payload: {
    ...params,
  },
});

export const loginSuccess = (data) => ({
  type: authTypes.LOGIN_SUCCESS,
  payload: {
    data,
  },
});

export const loginFailed = (error) => ({
  type: authTypes.LOGIN_FAILED,
  payload: {
    error,
  },
});

export const register = (params) => ({
  type: authTypes.REGISTER,
  payload: {
    ...params,
  },
});

export const registerSuccess = (data) => ({
  type: authTypes.REGISTER_SUCCESS,
  payload: {
    data,
  },
});

export const registerFailed = (error) => ({
  type: authTypes.REGISTER_FAILED,
  payload: {
    error,
  },
});

export const logout = (params) => ({
  type: authTypes.LOGOUT,
  payload: {
    ...params,
  },
});

export const logoutSuccess = (data) => ({
  type: authTypes.LOGOUT_SUCCESS,
  payload: {
    data,
  },
});

export const logoutFailed = (error) => ({
  type: authTypes.LOGOUT_FAILED,
  payload: {
    error,
  },
});
