/*
 * @Author: Johnhong9527
 * @Date:   2019-05-25 17:58:36
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-31 12:04:07
 */
import axios from 'axios';
import MUtil from 'util/mutil.jsx';
import { message } from 'antd';
const _mutil = new MUtil();
// 请求列表
const requestList = [];
// 取消列表
const CancelToken = axios.CancelToken;
let sources = {};

axios.defaults.timeout = 10000; // 超时取消请求
axios.defaults.baseURL = process.env.BASE_URL; // 设置默认请求地址
axios.defaults.withCredentials = true; // 允许跨域携带cookie
axios.interceptors.request.use(
  config => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data);

    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel;
    });

    if (requestList.includes(request)) {
      sources[request]('取消重复请求');
    } else {
      requestList.push(request);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data);
    requestList.splice(requestList.findIndex(item => item === request), 1);
    if (requestList.length === 0) {
      // 请求结束，取消loading
    }
    if (response.data.status === 0) {
      return response.data;
    } else if (response.data.status === 10) {
      // console.log(64);
      _mutil.doLogin();
      return;
    } else {
      return Promise.reject(response.data.msg || response.data.data);
    }
  },
  function(error) {
    if (axios.isCancel(error)) {
      requestList.length = 0;
      throw new axios.Cancel('cancel request');
    } else {
    }
    return Promise.reject(error);
  }
);

const request = function(url, params, config, method) {
  let fd = null;
  if (method === 'post' && params) {
    fd = new FormData();
    Object.keys(params).forEach(key => {
      if (params[key] !== '') {
        fd.append(key, params[key]);
      }
    });
  } else if (method === 'get' && params) {
    Object.keys(params).forEach((key, index) => {
      if (params[key] !== '') {
        url += `${index === 0 ? '?' : '&'}${key}=${params[key]}`;
      }
    });
  }

  const loading = message.loading('请稍等！', 0);
  return new Promise((resolve, reject) => {
    axios[method](
      url,
      fd,
      Object.assign(
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        config
      )
    )
      .then(
        response => {
          setTimeout(loading, 100);
          resolve(response);
        },
        err => {
          setTimeout(loading, 10);
          if (err.Cancel) {
            console.log(err);
          } else {
            reject(err);
          }
        }
      )
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url, params, config = {}) => {
  return request(url, params, config, 'post');
};

const get = (url, params, config = {}) => {
  return request(url, params, config, 'get');
};

export { sources, post, get };
