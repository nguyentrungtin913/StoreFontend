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
  addProductTypeSuccess
} from "../actions/productType";
import {
  getListProductType,
  deleteProductType,
  addProductType
} from "./../apis/productType";
import * as productTypeTypes from "./../constants/productType";

//product
import {
  fetchListProductSuccess,
  addProductSuccess,
  deleteProductSuccess,
  sellSuccess,
  buySuccess
} from "../actions/product";
import {
  getListProduct,
  sell,
  deleteProduct,
  addProduct,
  buy
} from "./../apis/product";
import * as productTypes from "./../constants/product";

//auth
import { loginSuccess, logoutSuccess } from "../actions/auth";
import { loginAPI, logoutAPI } from "./../apis/auth";
import * as authTypes from "./../constants/auth";

//order
import { fetchListOrderSuccess } from "../actions/order";
import { getListOrder } from "./../apis/order";
import * as orderTypes from "./../constants/order";

//orderDetail
import { fetchListOrderDetailSuccess } from "../actions/orderDetail";
import { getListOrderDetail } from "./../apis/orderDetail";
import * as orderDetailTypes from "./../constants/orderDetail";

//order
import { fetchListReportSuccess } from "../actions/report";
import { report } from "./../apis/report";
import * as reportTypes from "./../constants/report";
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
// product
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

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);

  //productType
  yield fork(watchFetchListProductTypeAction);
  yield takeLatest(productTypeTypes.DELETE_PRODUCT_TYPE, deleteProductTypeSaga);
  yield takeEvery(productTypeTypes.ADD_PRODUCT_TYPE, addProductTypeSaga);
  //product
  yield fork(watchFetchListProductAction);
  yield takeEvery(productTypes.SELL, addOrderSaga);
  yield takeEvery(productTypes.BUY, buyOrderSaga);
  yield takeEvery(productTypes.ADD_PRODUCT, addProductSaga);
  yield takeLatest(productTypes.DELETE_PRODUCT, deleteProductSaga);
  //order
  yield fork(watchFetchListOrderAction);
  //orderdetail
  yield fork(watchFetchListOrderDetailAction);
  //report
  yield fork(watchFetchListReportAction);
  //auth
  yield takeEvery(authTypes.LOGIN, loginSaga);
  yield takeEvery(authTypes.LOGOUT, logoutSaga);
}

export default rootSaga;
