import qs from "query-string";
import axiosService from "./../commons/axiosService";
import { API_URL } from "./../constants";
import { toastError } from "../helpers/toastHelper";

// http://l
const url = "products";

export const getListProduct = (params = {}) => {
  let queryParams = "?with[]=productType&sortBy=id&sortType=desc";
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

export const addProduct = product => {
  return axiosService.post(`${API_URL}/product`, product.product).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};
export const updateProduct = product => {
  return axiosService.put(`${API_URL}/product`, product.product).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};
export const deleteProduct = productId => {
  return axiosService
    .delete(`${API_URL}/product?id=${productId}`)
    .catch(err => {
      if (err.response.data[0]) {
        toastError(err.response.data[0].clientMsg);
      }
      console.log(err.response.data);
    });
};

export const sell = data => {
  return axiosService.post(`${API_URL}/order`, data.params).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const buy = data => {
  return axiosService.post(`${API_URL}/order-buy`, data.params).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const getListProductSoldOut = () => {

  return axiosService.get(`${API_URL}/products-sold-out?with[]=productType`).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

////////////////////////////
//seller
export const getListProductCustomer = (params = {}) => {
  let queryParams = "products-customer?with[]=productType&sortBy=id&sortType=desc";

  return axiosService.get(`${API_URL}/${queryParams}`).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const getListProductByProType = (proType) => {
  let queryParams = "products-by-pro-type?proType=" + proType;
  return axiosService.get(`${API_URL}/${queryParams}`).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const getListProductByArrId = (params) => {
  let queryParams = "products-by-id";
  return axiosService.post(`${API_URL}/${queryParams}`, params).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};

export const customerBuy = (params) => {
  let queryParams = "customer-buy";
  return axiosService.post(`${API_URL}/${queryParams}`, params).catch(err => {
    if (err.response.data[0]) {
      toastError(err.response.data[0].clientMsg);
    }
    console.log(err.response.data);
  });
};
