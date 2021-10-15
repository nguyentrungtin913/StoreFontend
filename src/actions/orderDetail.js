import * as orderDetailConstants from "./../constants/orderDetail";

export const fetchListOrderDetail = id => {
  return {
    type: orderDetailConstants.FETCH_ORDER_DETAIL,
    payload: {
      id
    }
  };
};

export const fetchListOrderDetailSuccess = data => {
  return {
    type: orderDetailConstants.FETCH_ORDER_DETAIL_SUCCESS,
    payload: {
      data
    }
  };
};
