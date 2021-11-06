/* eslint-disable no-restricted-globals */
import LoginPage from "../containers/LoginPage";
import SignupPage from "../containers/SignupPage";
import NotFound from "../containers/NotFound";
import ProductType from "../containers/ProductType";
import Product from "../containers/Product";
import Sell from "../containers/Sell";
import Buy from "../containers/Buy";
import Order from "../containers/Order";
import Report from "../containers/Report";
import Game from "../containers/Game";
import CartAdmin from "../containers/Cart";

import Home from "../containers/Seller/Home";
import Filter from "../containers/Seller/Filter";
import Cart from "../containers/Seller/Cart";
import ListAll from "../containers/Seller/ListAll";


export const HEIGHT = window.innerHeight;

export const API_ENDPOINT = "http://localhost:3000";
// export const API_URL = "http://myproject.io";
export const API_URL = 'https://backend-myproject.herokuapp.com';

export const STATUSES = [
  {
    value: 0,
    label: "READY"
  },
  {
    value: 1,
    label: "IN PROGRESS"
  },
  {
    value: 2,
    label: "COMPLETED"
  }
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 200,
  UPDATED: 200
};

export const ADMIN_ROUTES = [
  {
    name: "Bán hàng",
    path: "/admin/sell",
    exact: true,
    component: Sell
  },
  {
    name: "Nhập hàng",
    path: "/admin/buy",
    exact: true,
    component: Buy
  },
  {
    name: "Đơn đặt hàng",
    path: "/admin/cart",
    exact: true,
    component: CartAdmin
  },
  {
    name: "Hóa đơn",
    path: "/admin/order",
    exact: true,
    component: Order
  },
  {
    name: "Thống kê",
    path: "/admin/report",
    exact: true,
    component: Report
  },
  {
    name: "Quản lý loại sản phẩm",
    path: "/admin/product-type",
    exact: true,
    component: ProductType
  },
  {
    name: "Quản lý sản phẩm",
    path: "/admin/product",
    exact: true,
    component: Product
  },
  {
    name: "Giải trí",
    path: "/admin/play-game",
    exact: true,
    component: Game
  },
];


export const ROUTES = [

  {
    name: "Đăng nhập",
    path: "/login",
    exact: true,
    component: LoginPage
  },
  {
    name: "Đăng ký",
    path: "/signup",
    exact: true,
    component: SignupPage
  },

];
export const SELLER_ROUTES = [
  {
    name: "Trang Chủ",
    path: "/home",
    component: Home
  },

  {
    name: "Tìm kiếm",
    path: "/search",
    component: ListAll
  },
  {
    name: "Sản phẩm",
    path: "/product",
    component: Filter
  },
  {
    name: "Giỏ hàng",
    path: "/cart",
    component: Cart
  },
  {
    path: "",
    exact: false,
    component: NotFound
  }
];
