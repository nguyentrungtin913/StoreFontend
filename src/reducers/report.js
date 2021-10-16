import * as reportConstants from "./../constants/report";
//import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listProductReport: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case reportConstants.FETCH_REPORT_SUCCESS: {
      const data = action.payload.data.listProduct;
      return {
        ...state,
        listProductReport: data
      };
    }

    default:
      return state;
  }
};

export default reducer;
