import * as productConstants from "./../constants/product";
import { toastError, toastSuccess } from "../helpers/toastHelper";
import _ from 'lodash';

const initialState = {
  listProduct: [],
  form: false,
  productEditting: null
};

const reducer = (state = initialState, action) => {
  let index = -1;
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
    case productConstants.SET_PRODUCT_EDITING: {
      const { product } = action.payload;
      return {
        ...state,
        productEditting: product
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
      toastSuccess("Thêm sản phẩm thành công");
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

    case productConstants.UPDATE_PRODUCT_SUCCESS: {
      const { product } = action.payload.data.data;
      index = _.findIndex(state.listProduct, (pro) => {
        return pro.id === product.id;
      });
      state.listProduct[index] = product;
      toastSuccess("Cập nhật sản phẩm thành công");

      return {
        ...state,
        listProduct: state.listProduct,
        form: true
      };
    }

    case productConstants.DELETE_PRODUCT: {
      return {
        ...state
      };
    }
    case productConstants.DELETE_PRODUCT_SUCCESS: {
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
