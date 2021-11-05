import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { hideModal } from "../actions/modal";
import {
  addTaskFailed,
  addTaskSuccess,
  deleteTaskFailed,
  deleteTaskSuccess,
  fetchListTask,
  fetchListTaskSuccess,
  updateTaskFailed,
  updateTaskSuccess
} from "../actions/task";
import { hideLoading, showLoading } from "../actions/ui";
import { addTask, deleteTask, getList, updateTask } from "./../apis/task";
import { STATUSES, STATUS_CODE } from "./../constants";
import * as taskTypes from "./../constants/task";
//productType
import {
  fetchListProductTypeSuccess,
  deleteProductTypeSuccess,
  addProductTypeSuccess,
  updateProductTypeSuccess,
  ratingProductTypeSuccess,
  fetchListProductTypeByRatingSuccess,
  findProductTypeSuccess
} from "../actions/productType";
import {
  getListProductType,
  deleteProductType,
  addProductType,
  updateProductType,
  ratingProductType,
  getListProductTypeByRating,
  findProductType,
} from "./../apis/productType";
import * as productTypeTypes from "./../constants/productType";

//product
import {
  fetchListProductSuccess,
  addProductSuccess,
  deleteProductSuccess,
  sellSuccess,
  buySuccess,
  updateProductSuccess,
  fetchListProductByProTypeSuccess,
  fetchListProductByIdSuccess,
  customerBuySuccess,
  fetchListProductSoldOutSuccess,
} from "../actions/product";
import {
  getListProduct,
  sell,
  deleteProduct,
  addProduct,
  buy,
  updateProduct,
  getListProductByProType,
  getListProductByArrId,
  customerBuy,
  getListProductSoldOut
} from "./../apis/product";
import * as productTypes from "./../constants/product";

//auth
import { loginSuccess, logoutSuccess } from "../actions/auth";
import { loginAPI, logoutAPI } from "./../apis/auth";
import * as authTypes from "./../constants/auth";

//order
import { fetchListOrderSuccess, deleteOrderSuccess, exportOrderSuccess } from "../actions/order";
import { getListOrder, deleteOrder, exportOrder } from "./../apis/order";
import * as orderTypes from "./../constants/order";

//orderDetail
import { fetchListOrderDetailSuccess } from "../actions/orderDetail";
import { getListOrderDetail } from "./../apis/orderDetail";
import * as orderDetailTypes from "./../constants/orderDetail";

//report
import { fetchListReportSuccess } from "../actions/report";
import { report } from "./../apis/report";
import * as reportTypes from "./../constants/report";

//cart
import { fetchListCartSuccess, updateCartStatusSuccess, findCartSuccess } from "../actions/cart";
import { getListCart, updateCartStatus, findCart } from "./../apis/cart";
import * as cartTypes from "./../constants/cart";
/////////////////////////////////////////////////////////////

// product-type
function* watchFetchListProductTypeAction() {
  while (true) {
    const action = yield take(productTypeTypes.FETCH_PRODUCT_TYPE); // Khi FETCH_TASK được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getListProductType, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListProductTypeSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* watchFetchListProductTypeByRating() {
  while (true) {
    const action = yield take(productTypeTypes.FETCH_PRODUCT_TYPE_BY_RATING); // Khi FETCH_TASK được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getListProductTypeByRating, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListProductTypeByRatingSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* addProductTypeSaga({ payload }) {
  const { productType } = payload;
  yield put(showLoading());
  const resp = yield call(addProductType, {
    productType
  });

  if (resp) {
    const { data } = resp;
    yield put(addProductTypeSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* updateProductTypeSaga({ payload }) {
  const { productType } = payload;
  yield put(showLoading());
  const resp = yield call(updateProductType, {
    productType
  });
  if (resp) {
    const { data } = resp;
    yield put(updateProductTypeSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* ratingProductTypeSaga({ payload }) {
  const { productType } = payload;
  yield put(showLoading());
  const resp = yield call(ratingProductType, {
    productType
  });
  if (resp) {
    const { data } = resp;
    yield put(ratingProductTypeSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}


function* deleteProductTypeSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProductType, id);

  if (resp) {
    yield put(deleteProductTypeSuccess(id));
  }
  yield delay(1000);
  yield put(hideLoading());
}
function* watchFindProductTypeAction() {
  while (true) {
    const action = yield take(productTypeTypes.FIND_PRODUCT_TYPE);
    yield put(showLoading());
    const { proType } = action.payload;
    const resp = yield call(findProductType, proType);
    if (resp) {
      const { data } = resp;
      yield put(findProductTypeSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}
// product-type

// product

function* watchFetchListProductAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_PRODUCT);
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getListProduct, params);

    if (resp) {
      const { data } = resp;
      yield put(fetchListProductSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}


function* addProductSaga({ payload }) {
  const { product } = payload;
  yield put(showLoading());
  const resp = yield call(addProduct, {
    product
  });

  if (resp) {
    const { data } = resp;
    yield put(addProductSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}


function* updateProductSaga({ payload }) {
  const { product } = payload;
  yield put(showLoading());
  const resp = yield call(updateProduct, {
    product
  });
  if (resp) {
    const { data } = resp;
    yield put(updateProductSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}



function* deleteProductSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProduct, id);
  if (resp) {
    const { data } = resp;
    yield put(deleteProductSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* addOrderSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());

  const resp = yield call(sell, {
    params
  });

  if (resp) {
    const { data } = resp;
    yield put(sellSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* buyOrderSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());
  const resp = yield call(buy, {
    params
  });
  if (resp) {
    const { data } = resp;
    yield put(buySuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* watchFetchListProductSoldOutAction() {
  while (true) {
    yield take(productTypes.FETCH_PRODUCT_SOLD_OUT);
    yield put(showLoading());
    const resp = yield call(getListProductSoldOut);
    if (resp) {
      const { data } = resp;
      yield put(fetchListProductSoldOutSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}
//product-seller

function* watchFetchListProductByProTypeAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_PRODUCT_BY_TYPE);
    yield put(showLoading());
    const { proType } = action.payload;
    const resp = yield call(getListProductByProType, proType);
    if (resp) {
      const { data } = resp;
      yield put(fetchListProductByProTypeSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}


function* watchFetchListProductByIdAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_PRODUCT_BY_ID);
    const { params } = action.payload;
    const resp = yield call(getListProductByArrId, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListProductByIdSuccess(data));
    }
  }
}

function* customerBuySaga() {
  while (true) {
    const action = yield take(productTypes.CUSTOMER_BUY);
    const { params } = action.payload;
    const resp = yield call(customerBuy, params);
    if (resp) {
      const { data } = resp;
      yield put(customerBuySuccess(data));
    }
  }
}
// product
//task
function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK); // Khi FETCH_TASK được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getList, params);

    if (resp) {
      const { data } = resp;
      yield put(fetchListTaskSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(
    fetchListTask({
      q: keyword
    })
  );
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}


function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select(state => state.task.taskEditing);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id
  );
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}
// order
function* watchFetchListOrderAction() {
  while (true) {
    const action = yield take(orderTypes.FETCH_ORDER);
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getListOrder, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListOrderSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* deleteOrderSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteOrder, id);
  if (resp) {
    const { data } = resp;
    yield put(deleteOrderSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}


function* exportOrderSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());
  const resp = yield call(exportOrder, params);
  if (resp) {
    const { data } = resp;
    yield put(exportOrderSuccess(data));

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Order.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
  }
  yield delay(1000);
  yield put(hideLoading());
}



// orderDetail

function* watchFetchListOrderDetailAction() {
  while (true) {
    const action = yield take(orderDetailTypes.FETCH_ORDER_DETAIL);
    yield put(showLoading());
    const { id } = action.payload;
    const resp = yield call(getListOrderDetail, id);
    if (resp) {
      const { data } = resp;
      yield put(fetchListOrderDetailSuccess(data.data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

// report

function* watchFetchListReportAction() {
  while (true) {
    const action = yield take(reportTypes.FETCH_REPORT);
    yield put(showLoading());
    const { params } = action.payload;

    const resp = yield call(report, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListReportSuccess(data.data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

//auth
function* loginSaga({ payload }) {
  const { user } = payload;
  yield put(showLoading());
  const resp = yield call(loginAPI, {
    user
  });
  if (resp) {
    const { data } = resp;
    yield put(loginSuccess(data.data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* logoutSaga({ payload }) {
  yield put(showLoading());
  const resp = yield call(logoutAPI, null);
  if (resp) {
    yield put(logoutSuccess());
  }
  yield delay(1000);
  yield put(hideLoading());
}

//cart
function* watchFetchListCartAction() {
  while (true) {
    const action = yield take(cartTypes.FETCH_CART);
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getListCart, params);
    if (resp) {
      const { data } = resp;
      yield put(fetchListCartSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* updateCartStatusSaga({ payload }) {
  const { params } = payload;
  yield put(showLoading());
  const resp = yield call(updateCartStatus, params);
  console.log(resp)
  if (resp) {
    const { data } = resp;
    yield put(updateCartStatusSuccess(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}


function* watchFindCartAction() {
  while (true) {
    const action = yield take(cartTypes.FIND_CART);
    yield put(showLoading());
    const { id } = action.payload;
    const resp = yield call(findCart, id);
    if (resp) {
      const { data } = resp;
      yield put(findCartSuccess(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
  //productType
  yield fork(watchFetchListProductTypeAction);
  yield fork(watchFindProductTypeAction);
  yield takeLatest(productTypeTypes.DELETE_PRODUCT_TYPE, deleteProductTypeSaga);
  yield takeEvery(productTypeTypes.ADD_PRODUCT_TYPE, addProductTypeSaga);
  yield takeEvery(productTypeTypes.UPDATE_PRODUCT_TYPE, updateProductTypeSaga);
  yield takeEvery(productTypeTypes.RATING_PRODUCT_TYPE, ratingProductTypeSaga);
  yield fork(watchFetchListProductTypeByRating);
  //product
  yield fork(watchFetchListProductAction);
  yield takeEvery(productTypes.SELL, addOrderSaga);
  yield takeEvery(productTypes.BUY, buyOrderSaga);
  yield takeEvery(productTypes.ADD_PRODUCT, addProductSaga);
  yield takeLatest(productTypes.DELETE_PRODUCT, deleteProductSaga);
  yield takeEvery(productTypes.UPDATE_PRODUCT, updateProductSaga);
  yield fork(watchFetchListProductSoldOutAction);
  //product-sell
  yield fork(watchFetchListProductByProTypeAction);
  yield fork(watchFetchListProductByIdAction);
  yield fork(customerBuySaga);
  //order
  yield fork(watchFetchListOrderAction);
  yield takeLatest(orderTypes.DELETE_ORDER, deleteOrderSaga);
  yield takeEvery(orderTypes.EXPORT_ORDER, exportOrderSaga);
  //orderdetail
  yield fork(watchFetchListOrderDetailAction);
  //report
  yield fork(watchFetchListReportAction);
  //auth
  yield takeEvery(authTypes.LOGIN, loginSaga);
  yield takeEvery(authTypes.LOGOUT, logoutSaga);
  //cart
  yield fork(watchFetchListCartAction);
  yield takeEvery(cartTypes.UPDATE_CART, updateCartStatusSaga);
  yield fork(watchFindCartAction);
}

export default rootSaga;
