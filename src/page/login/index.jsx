/*
 * @Author: Johnhong9527
 * @Date:   2019-05-25 20:29:31
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-25 22:26:52
 */

import React from 'react';
import { Row, Col, PageHeader, Input, Button } from 'antd';
import PageTitle from 'component/page-title/index.jsx';

import './index.scss';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin'
    };
  }
  componentWillMount() {
    document.title = '登陆 - HAPPY MMALL';
  }
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className="login-wrapper">
        <Row>
          <Col span={8} push={8}>
            <div className="login">
              {/*
 <PageHeader className="ant-page-header" style={{ textAlign: 'center' }} title="欢迎登录 - MMALL管理系统" />

             */}
              <PageHeader title="欢迎登录 - MMALL管理系统" />

              <div className="content">
                <Row>
                  <Col span={22} push={1}>
                    <Input
                      placeholder="User Name"
                      type="text"
                      name="username"
                      onChange={e => {
                        this.onInputChange(e);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={22} push={1}>
                    <Input type="password" name="password" placeholder="Password" onChange={e => this.onInputChange(e)} />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={22} push={1}>
                    <Button block type="primary">
                      登陆1
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
