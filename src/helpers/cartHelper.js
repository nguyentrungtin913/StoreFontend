/* eslint-disable no-useless-concat */
import { toastSuccess, toastWarning } from './toastHelper';
import { mergeArrays, getCookie } from './storeCookie';

export function onAddToCart(id) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  let cart = getCookie(
    "Cart"
  );
  let pass = 1;
  let arr1 = [id]
  let arr2 = [1];
  let arr = mergeArrays(arr1, arr2);

  if (cart) {
    cart = JSON.parse(cart);
    cart.forEach(value => {
      let myArr = value.split(":");
      if (parseInt(myArr[0]) === id) {
        pass = 0;
      }
    });
    if (pass === 1) {
      cart.push(arr[0]);
      toastSuccess("Thêm vào giỏ hàng thành công !")
    } else {
      toastWarning("Sản phẩm đã tồn tại trong giỏ hàng !")
    }
  } else {
    cart = arr;
    toastSuccess("Thêm vào giỏ hàng thành công !")
  }
  document.cookie =
    "Cart" + "=" + JSON.stringify(cart) + ";" + expires + ";path=/";
}

export function cartRemove(id) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  let cart = getCookie(
    "Cart"
  );
  if (cart) {
    cart = JSON.parse(cart);
    for (let i = 0; i < cart.length; i++) {
      let myArr = cart[i].split(":");
      if (parseInt(myArr[0]) === id) {
        cart.splice(i, 1)
        toastSuccess("Xóa thành công !")
      }
    }
  }
  document.cookie =
    "Cart" + "=" + JSON.stringify(cart) + ";" + expires + ";path=/";
}

export function setAmount(id, amountSell) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  let cart = getCookie(
    "Cart"
  );
  if (cart) {
    cart = JSON.parse(cart);
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i])
      let myArr = (cart[i].toString()).split(":");
      if (parseInt(myArr[0]) === id) {
        let arr1 = [id]
        let arr2 = [amountSell];
        let arr = mergeArrays(arr1, arr2);
        cart[i] = arr[0];
      }
    }
  }
  document.cookie =
    "Cart" + "=" + JSON.stringify(cart) + ";" + expires + ";path=/";
}
