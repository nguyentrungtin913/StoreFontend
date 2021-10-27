import * as orderConstants from "./../constants/order";
import { toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listOrder: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.FETCH_ORDER: {
      return {
        ...state,
        listOrder: []
      };
    }
    case orderConstants.FETCH_ORDER_SUCCESS: {
      const data = action.payload.data.data.ListAllOrder;
      return {
        ...state,
        listOrder: data
      };
    }
    case orderConstants.DELETE_ORDER: {
      return {
        ...state
      };
    }
    case orderConstants.DELETE_ORDER_SUCCESS: {
      const { orderId } = action.payload.data.data.order;
      toastSuccess("Xóa hóa đơn thành công");
      return {
        ...state,
        listOrder: state.listOrder.filter(item => item.orderId !== orderId)
      };
    }
    case orderConstants.EXPORT_ORDER_SUCCESS:{
      toastSuccess("Xuất file thành công");
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
