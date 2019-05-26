/*
 * @Author: Johnhong9527
 * @Date:   2019-05-26 12:23:53
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-26 14:15:36
 */
import { message } from 'antd';
export default class MUtil {
  getUrlParams(name) {
    let queryString = window.location.search.split('?')[1] || '',
      reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  errorTips(errMsg) {
    message.error(`${errMsg || '好像哪里不对劲~'}`);
  }
}
