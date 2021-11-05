import * as cartConstants from "./../constants/cart";
import { toastSuccess } from "../helpers/toastHelper";
import _ from 'lodash';

const initialState = {
  ListCart: [],
  ListCartDetail: []
};

const reducer = (state = initialState, action) => {
  let index = -1;
  switch (action.type) {
    case cartConstants.FETCH_CART_SUCCESS: {
      const data = action.payload.data.data.ListAllCart;
      return {
        ...state,
        ListCart: data
      };
    }
    case cartConstants.UPDATE_CART_SUCCESS: {
      const { cart } = action.payload.data.data;
      index = _.findIndex(state.ListCart, (e) => {
        return e.cartId === cart.cartId;
      });
      if (index !== -1) {
        state.ListCart[index] = cart;
        toastSuccess("Cập nhật đơn đặt hàng thành công thành công");
      }
      let data = state.ListCart;
      return {
        ...state,
        ListCart: data
      };
    }
    case cartConstants.FIND_CART_SUCCESS: {
      const data = action.payload.data.data.cartDetails;
      console.log(action)
      return {
        ...state,
        ListCartDetail: data
      };
    }

    default:
      return state;
  }
};

export default reducer;
