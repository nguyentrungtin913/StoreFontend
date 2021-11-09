import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import uiReducer from "./ui";
import productTypeReducer from "./productType";
import productReducer from "./product";
import productChooseReducer from "./productChoose";
import authReducer from "./auth";
import orderReducer from "./order";
import orderDetailReducer from "./orderDetail";
import reportProductReducer from "./report";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  ui: uiReducer,
  form: formReducer,
  productType: productTypeReducer,
  product: productReducer,
  productChoose: productChooseReducer,
  auth: authReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  reportProduct: reportProductReducer,
  cart: cartReducer,
});

export default rootReducer;
