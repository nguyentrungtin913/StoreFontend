import * as reportConstants from "../constants/order";

export const fetchListOrder = (params = {}) => {
  return {
    type: reportConstants.FETCH_ORDER,
    payload: {
      params
    }
  };
};

export const fetchListOrderSuccess = data => {
  return {
    type: reportConstants.FETCH_ORDER_SUCCESS,
    payload: {
      data
    }
  };
};
