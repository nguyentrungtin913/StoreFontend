import qs from "query-string";
import axiosService from "../commons/axiosService";
import { API_URL } from "../constants";
import { toastError } from "../helpers/toastHelper";

const url = "orders";

export const getListOrder = (params = {}) => {
  let queryParams = "?sortBy=orderId";
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_URL}/${url}${queryParams}`).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const deleteOrder = orderId => {
  return axiosService
    .delete(`${API_URL}/order?orderId=${orderId}`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};

export const exportOrder = params => {
  // console.log("=====api=====");
  // console.log(`${API_URL}/export-orders`);
  // console.log("data", params);
  // console.log("=====api=====");
  return axiosService
    .post(`${API_URL}/export-orders`, params)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};
