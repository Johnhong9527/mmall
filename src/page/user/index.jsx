import React from 'react';
import { Row, Col, Table } from 'antd';
import User from 'api/user.jsx';
import MUtil from 'util/mutil.jsx';
import './index.scss';
const _user = new User();
const _mutil = new MUtil();

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null
    };
    this.getTableData = this.getTableData.bind(this);
  }
  componentWillMount() {
    this.getTableData(2, 10);
  }
  getTableData(num, size) {
    const request = {};
    if (size > 0) {
      request.pageSize = size;
    }
    if (num > 0) {
      request.pageNum = num;
    }
    _user.list(request).then(
      res => {
        console.log(res.data.list);
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }
  render() {
    return (
      <div className="user-wrapper">
        <Row>
          <Col span={24}>
            <span>User</span>
          </Col>
        </Row>
      </div>
    );
  }
}
