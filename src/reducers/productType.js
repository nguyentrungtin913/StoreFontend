import * as productTypeConstants from "./../constants/productType";
import { toastSuccess } from "../helpers/toastHelper";
import _ from 'lodash';

const initialState = {
  listProductType: [],
  productTypeEditting: null,
  listProductTypeByRating: [],
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
      console.log(data)
      return {
        ...state,
        listProductType: data
      };
    }

    case productTypeConstants.FETCH_PRODUCT_TYPE_BY_RATING_SUCCESS: {
      const data = action.payload.data.data.ListAllProductType;
      return {
        ...state,
        listProductTypeByRating: data
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

    case productTypeConstants.RATING_PRODUCT_TYPE_SUCCESS: {
      const { productType } = action.payload.data.data;
      console.log(productType)
      index = _.findIndex(state.listProductType, (proType) => {
        return proType.id === productType.id;
      });
      if (index !== -1) {
        state.listProductType[index] = productType;
        toastSuccess("Cập nhật loại sản phẩm thành công");
      }
      return {
        ...state,
        listProductType: state.listProductType,
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
    default:
      return state;
  }
};

export default reducer;
