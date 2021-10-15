import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import taskReducer from "./task";
import uiReducer from "./ui";
import modalReducer from "./modal";
import productTypeReducer from "./productType";
import productReducer from "./product";
import productChooseReducer from "./productChoose";
import authReducer from "./auth";
import orderReducer from "./order";
import orderDetailReducer from "./orderDetail";

const rootReducer = combineReducers({
  task: taskReducer,
  ui: uiReducer,
  modal: modalReducer,
  form: formReducer,
  productType: productTypeReducer,
  product: productReducer,
  productChoose: productChooseReducer,
  auth: authReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer
});

export default rootReducer;
