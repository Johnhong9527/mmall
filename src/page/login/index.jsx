/*
 * @Author: Johnhong9527
 * @Date:   2019-05-25 20:29:31
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-26 16:28:31
 */

import React from 'react';
import { Row, Col, PageHeader, Input, Button, message } from 'antd';
import PageTitle from 'component/page-title/index.jsx';
import User from 'api/user.jsx';
import MUtil from 'util/mutil.jsx';
// import axios from 'axios';
const _user = new User();
const _mutil = new MUtil();
import './index.scss';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin',
      redirect: _mutil.getUrlParams('redirect') || '/'
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

  sublime() {
    const loginInfo = {
        username: this.state.username,
        password: this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
    if (!checkResult.status) {
      _mutil.errorTips(checkResult.msg);
    } else {
      _user.login(loginInfo).then(
        res => {
          if (res.msg === '登录成功') {
            setTimeout(() => {
              message.success('登陆成功,', 0.5).then(() => {
                _mutil.setStorage('userInfo', res.data);
                message.loading('正在跳转到登录前的页面', 1.5).then(() => {
                  const pathName = _mutil.getUrlParams('redirect');
                  if (pathName) {
                    this.props.history.push(pathName);
                  } else {
                    this.props.history.push('/');
                  }
                });
              });
            }, 1600);
          }
        },
        errMsg => {
          setTimeout(() => {
            _mutil.errorTips(errMsg);
          }, 300);
        }
      );
    }
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
                      value={this.state.username}
                      onPressEnter={e => this.sublime(e)}
                      onChange={e => {
                        this.onInputChange(e);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={22} push={1}>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onPressEnter={e => this.sublime(e)}
                      onChange={e => this.onInputChange(e)}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={22} push={1}>
                    <Button block type="primary" size="large" onClick={e => this.sublime(e)}>
                      登陆
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
