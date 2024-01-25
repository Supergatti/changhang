import axios from "axios";
import { getToken, clearToken, clearId, clearRole } from "./auth";
import { message } from "antd";
import { BrowserRouter } from "react-router-dom";

const instance = axios.create({
  timeout: 500000,
});

//  全局请求拦截，发送请求之前执行
instance.interceptors.request.use(
  function (config) {
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//  请求返回之后执行
instance.interceptors.response.use(
  function (response) {
    const code = response.data.code; // 状态码
    const msg = response.data.message; // 获取错误信息
    const router = new BrowserRouter();
    if (code == 401) {
      message.error(msg);
      clearToken();
      clearId();
      clearRole();
      // router.history.push({ pathname: `/` }); //路由跳转
      window.location.href = "/";
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params  url参数
 */
export function get(url, params) {
  return instance.get(url, {
    params,
  });
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function post(url, data) {
  return instance.post(url, data);
}

/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function put(url, data) {
  return instance.put(url, data);
}

/**
 * delete请求
 * @param {*} url   请求地址
 */
export function del(url) {
  return instance.delete(url);
}
