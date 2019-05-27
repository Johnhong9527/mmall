/*
 * @Author: Johnhong9527
 * @Date:   2019-05-27 09:20:10
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-27 09:28:31
 */
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import PageTitle from 'component/page-title/index.jsx';
export default class Error extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    document.title = this.props.title + '  - HAPPY MMALL';
  }
  render() {
    return (
      <div className="page-wrapper">
        <PageTitle title="出错了！" />
        <Row>
          <Col span={24}>
            <span>找不到该路径，</span>
            <Link to="/">点我返回首页</Link>
          </Col>
        </Row>
      </div>
    );
  }
}
