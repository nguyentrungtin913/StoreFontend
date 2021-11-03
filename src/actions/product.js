import * as productConstants from "./../constants/product";

export const fetchListProduct = (params = {}) => {
  return {
    type: productConstants.FETCH_PRODUCT,
    payload: {
      params
    }
  };
};

export const fetchListProductSuccess = data => {
  return {
    type: productConstants.FETCH_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};

export const setProductEditing = product => {
  return {
    type: productConstants.SET_PRODUCT_EDITING,
    payload: {
      product
    }
  };
};

export const updateProduct = product => {
  return {
    type: productConstants.UPDATE_PRODUCT,
    payload: {
      product
    }
  };
};

export const updateProductSuccess = data => {
  return {
    type: productConstants.UPDATE_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};

export const deleteProduct = id => {
  return {
    type: productConstants.DELETE_PRODUCT,
    payload: {
      id
    }
  };
};

export const deleteProductSuccess = data => {
  return {
    type: productConstants.DELETE_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};

export const ListChoose = () => {
  return {
    type: productConstants.LIST_CHOOSE,
    payload: {}
  };
};

export const chooseProduct = product => {
  return {
    type: productConstants.CHOOSE_PRODUCT,
    payload: {
      product
    }
  };
};

export const cancelProduct = id => {
  return {
    type: productConstants.CANCEL_PRODUCT,
    payload: {
      id
    }
  };
};

export const upProduct = (id, type) => {
  return {
    type: productConstants.UP_PRODUCT,
    payload: {
      id,
      type
    }
  };
};

export const downProduct = (id, type) => {
  return {
    type: productConstants.DOWN_PRODUCT,
    payload: {
      id,
      type
    }
  };
};

export const stepProduct = (id, type) => {
  return {
    type: productConstants.STEP_PRODUCT,
    payload: {
      id,
      type
    }
  };
};


export const openForm = (type) => {
  return {
    type: productConstants.OPEN_FORM,
    payload: {
      type
    }
  };
};

export const addProduct = product => {
  return {
    type: productConstants.ADD_PRODUCT,
    payload: {
      product
    }
  };
};

export const addProductSuccess = data => {
  return {
    type: productConstants.ADD_PRODUCT_SUCCESS,
    payload: {
      data
    }
  };
};

export const sell = params => {
  return {
    type: productConstants.SELL,
    payload: {
      params
    }
  };
};

export const sellSuccess = data => {
  return {
    type: productConstants.SELL_SUCCESS,
    payload: {
      data
    }
  };
};

export const buy = params => {
  return {
    type: productConstants.BUY,
    payload: {
      params
    }
  };
};

export const buySuccess = data => {
  return {
    type: productConstants.BUY_SUCCESS,
    payload: {
      data
    }
  };
};
//////////////////////////////////////
export const fetchListProductByProType = (proType) => {
  return {
    type: productConstants.FETCH_PRODUCT_BY_TYPE,
    payload: {
      proType
    }
  };
};

export const fetchListProductByProTypeSuccess = data => {
  return {
    type: productConstants.FETCH_PRODUCT_BY_TYPE_SUCCESS,
    payload: {
      data
    }
  };
};
