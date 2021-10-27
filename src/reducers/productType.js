import * as productTypeConstants from "./../constants/productType";
import { toastError, toastSuccess } from "../helpers/toastHelper";
import _ from 'lodash';

const initialState = {
  listProductType: [],
  productTypeEditting: null
};

const reducer = (state = initialState, action) => {
  let index = -1;
  switch (action.type) {
    case productTypeConstants.FETCH_PRODUCT_TYPE: {
      return {
        ...state,
        listProductType: []
      };
    }
    case productTypeConstants.FETCH_PRODUCT_TYPE_SUCCESS: {
      const data = action.payload.data.data.ListAllProductType;
      return {
        ...state,
        listProductType: data
      };
    }

    case productTypeConstants.FETCH_PRODUCT_TYPE_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listProductType: []
      };
    }

    case productTypeConstants.OPEN_FORM: {
      let { type } = action.payload;
      let proTypeEditting = state.productTypeEditting;
      if (type) {
        proTypeEditting = null;
      }
      return {
        ...state,
        form: false,
        productTypeEditting: proTypeEditting
      };
    }

    case productTypeConstants.ADD_PRODUCT_TYPE: {
      return {
        ...state,
        productTypeEditting: null,
        form: false
      };
    }
    case productTypeConstants.ADD_PRODUCT_TYPE_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Thêm mới loại sản phẩm mới thành công");
      return {
        ...state,
        listProductType: [data.data.productType].concat(state.listProductType),
        form: true
      };
    }
    case productTypeConstants.ADD_PRODUCT_TYPE_FAILED: {
      toastError("faild");
      return {
        ...state
      };
    }

    case productTypeConstants.UPDATE_PRODUCT_TYPE_SUCCESS: {
      const { productType } = action.payload.data.data;
      index = _.findIndex(state.listProductType, (proType) => {
        return proType.id === productType.id;
      });
      state.listProductType[index] = productType;
      toastSuccess("Cập nhật loại sản phẩm thành công");

      return {
        ...state,
        listProductType: state.listProductType,
        form: true
      };
    }
    case productTypeConstants.SET_PRODUCT_TYPE_EDITING: {
      const { productType } = action.payload;
      return {
        ...state,
        productTypeEditting: productType
      };
    }

    case productTypeConstants.DELETE_PRODUCT_TYPE: {
      return {
        ...state
      };
    }
    case productTypeConstants.DELETE_PRODUCT_TYPE_SUCCESS: {
      const { data: id } = action.payload; // task id
      toastSuccess("Xóa loại sản phẩm thành công");
      return {
        ...state,
        listProductType: state.listProductType.filter(item => item.id !== id)
      };
    }
    case productTypeConstants.DELETE_PRODUCT_TYPE_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reducer;
