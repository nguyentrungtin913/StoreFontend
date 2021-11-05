import axiosService from "../commons/axiosService";
import { API_URL } from "../constants";
import { toastError } from "../helpers/toastHelper";

export const getListCart = () => {
  return axiosService
    .get(`${API_URL}/carts?sortBy=cartId&sortType=desc`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};

export const updateCartStatus = (params) => {
  return axiosService
    .put(`${API_URL}/cart`, params)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};

export const findCart = (id) => {
  return axiosService
    .get(`${API_URL}/cart-details?cartId=${id}`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};
