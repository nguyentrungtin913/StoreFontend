import * as types from "./../constants/auth";
import { toastSuccess } from "../helpers/toastHelper";

const initialState = {
  login: false,
  logout: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state
      };
    }
    case types.LOGIN_SUCCESS: {
      const { data } = action.payload;
      const d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "Token" + "=" + data.accessToken + ";" + expires + ";path=/";
      return {
        ...state,
        login: true,
        logout: false
      };
    }
    case types.LOGIN_FAILED: {
      return {
        ...state
      };
    }

    case types.LOGOUT: {
      return {
        ...state,
        login: false,
        logout: true
      };
    }
    case types.LOGOUT_SUCCESS: {
      toastSuccess("Đăng xuất thành công!");
      return {
        ...state,
        login: false
      };
    }

    default:
      return state;
  }
};
export default reducer;
