/*
 * @Author: Johnhong9527
 * @Date:   2019-05-25 17:58:36
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-26 14:40:38
 */
import axios from 'axios';
// 请求列表
const requestList = [];
// 取消列表
const CancelToken = axios.CancelToken;
let sources = {};

// axios.defaults.timeout = 10000; //超时取消请求
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.baseURL = process.env.BASE_URL;

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
      // store.dispatch('changeGlobalState', { loading: true });
    }

    // const token = store.getters.userInfo.token;
    // if (token) {
    //   config.headers.token = 'token';
    // }
    // config.headers.token = 'token';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // console.log(response);
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data);
    requestList.splice(requestList.findIndex(item => item === request), 1);
    if (requestList.length === 0) {
      // 请求结束，取消loading
    }
    if (response.data.status === 0) {
      return {
        data: response.data.data,
        msg: response.data.msg
      };
    } else if (response.data.status === 10) {
      // window.ELEMENT.Message.error('认证失效，请重新登录！', 1000);
      doLogin();
      return;
    } else {
      return Promise.reject(response.data.msg || response.data.data);
    }
  },
  function(error) {
    if (axios.isCancel(error)) {
      requestList.length = 0;
      // store.dispatch('changeGlobalState', { loading: false });
      throw new axios.Cancel('cancel request');
    } else {
      // window.ELEMENT.Message.error('网络请求失败', 1000);
    }
    return Promise.reject(error);
  }
);

const request = function(url, params, config, method) {
  const fd = new FormData();
  Object.keys(params).forEach(key => {
    fd.append(key, params[key]);
  });
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
          resolve(response);
        },
        err => {
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
function doLogin() {
  window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
}

export { sources, post, get };
