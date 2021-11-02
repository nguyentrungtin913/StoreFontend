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

export const fetchListProductTypeByRating = () => {
  return {
    type: productTypeConstants.FETCH_PRODUCT_TYPE_BY_RATING,
    payload: {

    }
  };
};

export const fetchListProductTypeByRatingSuccess = data => {
  return {
    type: productTypeConstants.FETCH_PRODUCT_TYPE_BY_RATING_SUCCESS,
    payload: {
      data
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

export const ratingProductType = (productType) => {
  return {
    type: productTypeConstants.RATING_PRODUCT_TYPE,
    payload: {
      productType
    }
  };
};

export const ratingProductTypeSuccess = data => {
  return {
    type: productTypeConstants.RATING_PRODUCT_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};
