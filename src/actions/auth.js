import * as authTypes from "./../constants/auth";
export const login = user => {
  return {
    type: authTypes.LOGIN,
    payload: {
      user
    }
  };
};

export const loginSuccess = data => {
  return {
    type: authTypes.LOGIN_SUCCESS,
    payload: {
      data
    }
  };
};

export const logout = () => {
  return {
    type: authTypes.LOGOUT,
    payload: {}
  };
};

export const logoutSuccess = data => {
  return {
    type: authTypes.LOGOUT_SUCCESS,
    payload: {
      data
    }
  };
};

