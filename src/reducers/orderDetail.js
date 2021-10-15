import * as orderDetailConstants from "./../constants/orderDetail";
//import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listOrderDetail: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderDetailConstants.FETCH_ORDER_DETAIL: {
      return {
        ...state,
        listOrderDetail: []
      };
    }
    case orderDetailConstants.FETCH_ORDER_DETAIL_SUCCESS: {
      console.log(action.payload.data.ListOrderDetail);
      const data = action.payload.data.ListOrderDetail;
      return {
        ...state,
        listOrderDetail: data
      };
    }

    default:
      return state;
  }
};

export default reducer;
