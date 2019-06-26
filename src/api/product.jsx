/*
 * @Author: Johnhong9527
 * @Date:   2019-05-30 13:06:05
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 14:34:34
 */
import { post, get } from 'util/http.jsx';
import get_category from 'api/get_category.jsx';

export default class Product {
  // 获取商品列表
  list(params) {
    if (params.listType === 'search') {
      return post('/manage/product/search', params);
    }
    // return post('/manage/product/list.do', params);
    return post('/manage/product/list', params);
  }

  // 变更商品销售状态
  setProductStatus(params) {
    return post('/manage/product/set_sale_status', params);
  }

  // 上传图片
  uploadImage(params, config) {
    // return post('/manage/product/upload.do', params, config);
    return post('/manage/product/upload', params, config);
  }

  // 增加商品
  saveProduct(params) {
    return post('/manage/product/save', params);
  }
  // 商品详情
  getProduct(productId) {
    return get('/manage/product/detail', {
      productId: productId || 0
    });
  }

  /*
   *  品类相关
   */

  // 根据父品类id获取品类列表
  getCategoryList(parentCategoryId) {
    return get('/manage/category/get_category', {
      categoryId: parentCategoryId
    });
    /*if (parentCategoryId) {
      return post('/manage/category/get_category', {
        categoryId: parentCategoryId
      });
    } else {
      return new Promise(resolve => resolve(get_category));
    }*/
  }
}
