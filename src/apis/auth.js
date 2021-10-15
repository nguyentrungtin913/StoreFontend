import axiosService from "./../commons/axiosService";
import { API_URL } from "./../constants";
import { toastError } from "../helpers/toastHelper";

export const loginAPI = user => {
  return axiosService.post(`${API_URL}/login`, user.user).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const logoutAPI = () => {
  return axiosService.get(`${API_URL}/logout`, null).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};
