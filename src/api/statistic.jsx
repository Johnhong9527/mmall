import {post, get} from "util/http.jsx";

export default class Statistic {
  // 首页数据统计
  getHomeCount() {
    return get("/manage/statistic/base_count");
  }
}
