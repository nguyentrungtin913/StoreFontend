import * as productConstants from "./../constants/product";
import { toastError, toastSuccess } from "../helpers/toastHelper";

const initialState = {
  listProduct: [],
  form: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.FETCH_PRODUCT: {
      return {
        ...state,
        listProduct: []
      };
    }
    case productConstants.FETCH_PRODUCT_SUCCESS: {
      const data = action.payload.data.data.ListAllProduct;
      return {
        ...state,
        listProduct: data
      };
    }
    case productConstants.FETCH_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listProduct: []
      };
    }
    case productConstants.OPEN_FORM: {
      return {
        ...state,
        form: false
      };
    }
    case productConstants.ADD_PRODUCT: {
      return {
        ...state
      };
    }
    case productConstants.ADD_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Thêm mới công việc thành công");
      return {
        ...state,
        listProduct: [data.data.product].concat(state.listProduct),
        form: true
      };
    }
    case productConstants.ADD_PRODUCT_FAILED: {
      toastError("faild");
      return {
        ...state
      };
    }

    case productConstants.DELETE_PRODUCT: {
      return {
        ...state
      };
    }
    case productConstants.DELETE_PRODUCT_SUCCESS: {
      //console.log(action.payload.data.data.product)
      const { product } = action.payload.data.data;
      toastSuccess("Xóa sản phẩm `" + product.name + " ` thành công");
      return {
        ...state,
        listProduct: state.listProduct.filter(item => item.id !== product.id)
      };
    }
    case productConstants.DELETE_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
    case productConstants.SELL_SUCCESS: {
      const { data } = action.payload;
      data.forEach(sell => {
        state.listProduct.forEach(pro => {
          if (sell.id === pro.id) {
            pro.amount -= sell.amountSell;
          }
        });
      });
      return {
        ...state,
        listProduct: state.listProduct
      };
    }
    case productConstants.BUY_SUCCESS: {
      const { data } = action.payload;
      data.forEach(sell => {
        state.listProduct.forEach(pro => {
          if (sell.id === pro.id) {
            pro.amount += sell.amountSell;
          }
        });
      });
      return {
        ...state,
        listProduct: state.listProduct
      };
    }

    default:
      return state;
  }
};

export default reducer;
