import * as orderConstants from "../constants/order";

export const fetchListOrder = (params = {}) => {
  return {
    type: orderConstants.FETCH_ORDER,
    payload: {
      params
    }
  };
};

export const fetchListOrderSuccess = data => {
  return {
    type: orderConstants.FETCH_ORDER_SUCCESS,
    payload: {
      data
    }
  };
};
export const deleteOrder = (id) => {
  return {
    type: orderConstants.DELETE_ORDER,
    payload: {
      id
    }
  };
};

export const deleteOrderSuccess = data => {
  return {
    type: orderConstants.DELETE_ORDER_SUCCESS,
    payload: {
      data
    }
  };
};
