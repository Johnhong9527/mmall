/*
 * @Author: Johnhong9527
 * @Date:   2019-05-26 12:23:53
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-10 11:53:11
 */
import { message } from 'antd';
export default class MUtil {
  // 前往登录页面
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  // 获取跳转前的path name
  getUrlParams(name) {
    let queryString = window.location.search.split('?')[1] || '',
      reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  // 成功提示
  successTips(sucMsg) {
    message.success(`${sucMsg || '请求成功了~'}`);
  }
  // 错误提示
  errorTips(errMsg) {
    message.error(`${errMsg || '好像哪里不对劲~'}`);
  }
  // 设置 本地缓存
  setStorage(name, data) {
    const typeDate = typeof data;
    if (typeDate === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (['number', 'string', 'boolean'].indexOf(typeDate) > -1) {
      window.localStorage.setItem(name, data);
    } else {
      this.errorTips('该数据类型不能用于本地存储');
    }
  }
  // 获取 缓存数据
  getStorage(name) {
    const data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return '';
    }
  }
  // 删除 缓存数据
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}
