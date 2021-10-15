import axiosService from "../commons/axiosService";
import { API_URL } from "../constants";
import { toastError } from "../helpers/toastHelper";

export const getListOrderDetail = id => {
  return axiosService
    .get(`${API_URL}/order-detail?orderId=${id}&&with[]=product`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};
