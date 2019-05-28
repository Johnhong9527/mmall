import React from 'react';
import { Row, Col, Table } from 'antd';
import User from 'api/user.jsx';
import MUtil from 'util/mutil.jsx';
import moment from 'moment';
import './index.scss';
const _user = new User();
const _mutil = new MUtil();
console.log();

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      pagination: {
        total: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20']
      },
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '注册时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: createTime => moment(createTime).format('YYYY/MM/DD ahh:mm:ss')
        }
      ]
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
        this.setState({
          tableData: res.data.list,
          pagination: {
            total: res.data.total
          }
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }
  onTableChange(pagination, filters, sorter, extra) {
    if (pagination !== undefined) {
      this.getTableData(pagination.current, pagination.pageSize);
    }
  }
  render() {
    return (
      <div className="user-wrapper">
        <Row>
          <Col span={24}>
            <Table
              bordered
              onChange={e => this.onTableChange(e)}
              rowKey="createTime"
              pagination={this.state.pagination}
              dataSource={this.state.tableData}
              columns={this.state.columns}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
