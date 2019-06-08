/*
 * @Author: Johnhong9527
 * @Date:   2019-05-30 13:06:05
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-05 14:12:10
 */
import { post, get } from 'util/http.jsx';
import get_category from 'api/get_category.jsx';

export default class Product {
  // 获取商品列表
  list(params) {
    if (params.listType === 'search') {
      return get('/manage/product/search.do', params);
    }
    return post('/manage/product/list.do', params);
  }
  
  // 变更商品销售状态
  setProductStatus(params) {
    return get('/manage/product/set_sale_status.do', params);
  }
  
  // 上传图片
  uploadImage(params, config) {
    // return post('/manage/product/upload.do', params, config);
    return post('http://localhost:3333/upload', params, config);
  }
  
  // 增加商品
  saveProduct(params) {
    return post('/manage/product/save.do', params);
  }
  
  /*
   *  品类相关
   */
  
  // 根据父品类id获取品类列表
  getCategoryList(parentCategoryId) {
    if (parentCategoryId) {
      return post('/manage/category/get_category.do', {
        categoryId: parentCategoryId
      });
    } else {
      return new Promise(resolve => resolve(get_category));
    }
    
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
