/*
 * @Author: Johnhong9527
 * @Date:   2019-05-26 17:21:24
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-26 17:26:30
 */
import { post, get } from 'util/http.jsx';
export default class Statistic {
  // 首页数据统计
  getHomeCount() {
    return get('/manage/statistic/base_count.do');
  }
  // 检查登陆接口的数据是不是合法
  checkLoginInfo(loginInfo) {
    let username = `${loginInfo.username}`,
      password = `${loginInfo.password}`;
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空'
      };
    }
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空'
      };
    }
    return {
      status: true,
      msg: '验证通过'
    };
  }
}
