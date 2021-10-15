import axios from "axios";
// import {Token} from './../reducers/auth';

class AxiosService {
  constructor() {
    const instance = axios.create();
    // console.log(Token)
    // instance.defaults.headers.common['Authorization'] =  "";
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  getCookie(cname) {
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

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    this.instance.defaults.headers.common["Authorization"] = this.getCookie(
      "Token"
    );
    return this.instance.get(url);
  }

  post(url, body) {
    this.instance.defaults.headers.common["Authorization"] = this.getCookie(
      "Token"
    );
    return this.instance.post(url, body);
  }

  put(url, body) {
    this.instance.defaults.headers.common["Authorization"] = this.getCookie(
      "Token"
    );
    return this.instance.put(url, body);
  }

  delete(url) {
    this.instance.defaults.headers.common["Authorization"] = this.getCookie(
      "Token"
    );
    return this.instance.delete(url);
  }
}

export default new AxiosService();
