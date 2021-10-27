import * as productTypeConstants from "./../constants/productType";

export const fetchListProductType = (params = {}) => {
  return {
    type: productTypeConstants.FETCH_PRODUCT_TYPE,
    payload: {
      params
    }
  };
};

export const fetchListProductTypeSuccess = data => {
  return {
    type: productTypeConstants.FETCH_PRODUCT_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};

export const fetchListProductTypeFailed = error => {
  return {
    type: productTypeConstants.FETCH_PRODUCT_TYPE_FAILED,
    payload: {
      error
    }
  };
};

export const openForm = type => {
  return {
    type: productTypeConstants.OPEN_FORM,
    payload: {type}
  };
};

export const addProductType = productType => {
  return {
    type: productTypeConstants.ADD_PRODUCT_TYPE,
    payload: {
      productType
    }
  };
};

export const addProductTypeSuccess = data => {
  return {
    type: productTypeConstants.ADD_PRODUCT_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};

export const addProductTypeFailed = error => {
  return {
    type: productTypeConstants.ADD_PRODUCT_TYPE_FAILED,
    payload: {
      error
    }
  };
};

export const setProductTypeEditing = productType => {
  return {
    type: productTypeConstants.SET_PRODUCT_TYPE_EDITING,
    payload: {
      productType
    }
  };
};

export const updateProductType = productType => {
  return {
    type: productTypeConstants.UPDATE_PRODUCT_TYPE,
    payload: {
      productType
    }
  };
};

export const updateProductTypeSuccess = data => {
  return {
    type: productTypeConstants.UPDATE_PRODUCT_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};

export const updateProductTypeFailed = error => {
  return {
    type: productTypeConstants.UPDATE_PRODUCT_TYPE_FAILED,
    payload: {
      error
    }
  };
};

export const deleteProductType = id => {
  return {
    type: productTypeConstants.DELETE_PRODUCT_TYPE,
    payload: {
      id
    }
  };
};

export const deleteProductTypeSuccess = data => {
  return {
    type: productTypeConstants.DELETE_PRODUCT_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};

export const deleteProductTypeFailed = error => {
  return {
    type: productTypeConstants.DELETE_PRODUCT_TYPE_FAILED,
    payload: {
      error
    }
  };
};
