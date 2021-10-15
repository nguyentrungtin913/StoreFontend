import * as reportConstants from "./../constants/order";
//import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listOrder: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reportConstants.FETCH_ORDER: {
      return {
        ...state,
        listOrder: []
      };
    }
    case reportConstants.FETCH_ORDER_SUCCESS: {
      const data = action.payload.data.data.ListAllOrder;
      return {
        ...state,
        listOrder: data
      };
    }

    default:
      return state;
  }
};

export default reducer;
