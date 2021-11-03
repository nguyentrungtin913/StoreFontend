export function mergeArrays(arr1, arr2) {
  var l = Math.min(arr1.length, arr2.length), ret = [], i;
  for (i = 0; i < l; i++) {
    ret.push(arr1[i] + ":" + arr2[i]);
  }
  return ret;
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
