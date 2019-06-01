/*
 * @Author: Johnhong9527
 * @Date:   2019-05-30 13:06:05
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-01 10:37:12
 */
import { post, get } from 'util/http.jsx';
export default class Product {
  // 获取商品列表
  list(params) {
    if (params.listType === 'search') {
      return get('/manage/product/search.do', params);
    }
    return post('/manage/product/list.do', params);
  }
  // setProductStatus
  setProductStatus(params) {
    return get('/manage/product/set_sale_status.do', params);
  }
  // 商品查询
  // search(params) {
  //   params.listType = 'search';
  //   return get('/manage/product/search.do', params);
  // }
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
