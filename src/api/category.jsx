import {post, get} from "util/http.jsx";

export default class Category {
  // 获取品类
  getCategory(categoryId = 0) {
    return get("/manage/category/get_category?categoryId=" + categoryId);
  }

  // 添加品类
  addCategory(params) {
    return get("/manage/category/add_category", params);
  }

  // 修改品类名称
  setCategoryName(params) {
    return get("/manage/category/set_category_name", params);
  }
}
