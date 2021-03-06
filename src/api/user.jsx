/*
 * @Author: Johnhong9527
 * @Date:   2019-05-26 12:01:45
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-27 10:10:29
 */
import { post, get } from 'util/http.jsx';
export default class User {
  // 用户登录
  login(loginInfo) {
    return post('/manage/user/login', loginInfo);
  }
  // 用户列表  /manage/user/list.do
  list(request) {
    return get('/manage/user/list', request);
  }
  // 用户退出登录
  logout() {
    return post('/user/logout.do');
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
