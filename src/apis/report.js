import axiosService from "../commons/axiosService";
import { API_URL } from "../constants";
import { toastError } from "../helpers/toastHelper";


export const report = params => {
  return axiosService.post(`${API_URL}/report`, params).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};
