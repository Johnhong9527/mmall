/*
* @Author: Johnhong9527
* @Date:   2019-05-27 09:31:50
* @Last Modified by:   Johnhong9527
* @Last Modified time: 2019-05-30 15:12:52
*/
import React from 'react';
import {Button, PageHeader, Icon, Row, Col} from 'antd';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import Statistic from 'api/statistic.jsx';
import MUtil from 'util/mutil.jsx';
// import axios from 'axios';
const _statistic = new Statistic();
const _mutil = new MUtil();
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: '_',
      productCount: '_',
      orderCount: '_'
    };
  }

  componentDidMount() {
    _statistic.getHomeCount().then(
      res => {
        this.setState({
          userCount: res.userCount,
          productCount: res.productCount,
          orderCount: res.orderCount
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }

  getUser() {
    console.log(7);
  }

  render() {
    return (
      <div className="page-wrapper">
        {/*
        <PageTitle title="首页" />
        <PageHeader title="首页"/>
        */}
        <PageTitle title="首页"/>
        <Row gutter={48}>
          <Col span={8}>
            <div className="color-box brown">
              <div className="number">{this.state.userCount}</div>
              <div className="desc">
                <Icon type="user"/>
                &nbsp;用户总数
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="color-box green">
              <div className="number">{this.state.productCount}</div>
              <div className="desc">
                <Icon type="unordered-list"/>
                &nbsp;商品总数
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="color-box blue">
              <div className="number">{this.state.orderCount}</div>
              <div className="desc">
                <Icon type="appstore"/>
                &nbsp;订单总数
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
