import qs from "query-string";
import axiosService from "./../commons/axiosService";
import { API_URL } from "./../constants";
import { toastError } from "../helpers/toastHelper";

const url = "product-types";

export const getListProductType = (params = {}) => {
  let queryParams = "?sortBy=id";
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

export const addProductType = productType => {
  // console.log("=====api=====");
  // console.log(`${API_URL}/product-type`);
  // console.log("data", productType.productType);
  // console.log("=====api=====");
  return axiosService
    .post(`${API_URL}/product-type`, productType.productType)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};

export const updateProductType = productType => {
  return axiosService.put(`${API_URL}/product-type`, productType.productType).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const deleteProductType = productTypeId => {
  return axiosService
    .delete(`${API_URL}/product-type?typeId=${productTypeId}`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};
