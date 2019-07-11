/*
 * @Author: Johnhong9527
 * @Date:   2019-05-30 13:07:11
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-07-09 11:03:01
 */
import React from 'react';
import { Row, Col, Table, Button, Modal, Select, Input } from 'antd';
import Product from 'api/product.jsx';
import MUtil from 'util/mutil.jsx';
import moment from 'moment';
import PageTitle from 'component/page-title/index.jsx';

import './index.scss';
const _product = new Product();
const _mutil = new MUtil();
const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      loading: true,
      current: 1, // 当前页数
      pageSize: 5,
      pagination: {
        total: 0, // 数据总条数
        current: 1, // 当前页数
        pageSize: 5, // 当页数据条数
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10']
      },
      columns: [
        {
          title: '商品ID',
          dataIndex: 'id',
          key: 'id',
          align: 'center'
        },
        {
          title: '商品信息',
          dataIndex: 'name',
          key: 'name',
          render: (value, row, index) => {
            return (
              <div>
                <div>{row.name}</div>
                <div>{row.subtitle}</div>
              </div>
            );
          }
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: (value, row, index) => {
            return (
              <span>
                <span>{value === 1 ? '在售' : '已下架'}</span>&nbsp;
                <Button className="btn-warning" size="small" onClick={e => this.onSetProductStatus(row)}>
                  {value === 1 ? '下架' : '上架'}
                </Button>
              </span>
            );
          }
        },
        {
          title: '操作',
          dataIndex: 'createTime',
          key: 'createTime',
          align: 'center',
          width: 150,
          render: (value, row, index) => {
            return (
              <span>
                <Button type="primary" size="small" onClick={e => this.view(row.id)}>
                  查看
                </Button>
                &nbsp;
                <Button size="small" onClick={e => this.edit(row.id)}>
                  编辑
                </Button>
              </span>
            );
          }
        }
      ],
      listType: 'list', // 设置商品列表请求的数据类型
      search: {
        type: 'productId',
        value: ''
      } // 根据ID搜索 | 根据名称搜索
    };
    this.getTableData = this.getTableData.bind(this);
  }
  componentWillMount() {
    this.getTableData();
  }
  getTableData() {
    const request = {};
    request.pageNum = this.state.current;
    request.pageSize = this.state.pageSize;
    // console.log(this.state.pageSize);
    // return;
    if (this.state.listType === 'search') {
      request[this.state.search.type] = this.state.search.value; // 根据ID搜索 | 根据名称搜索
      request.listType = this.state.listType; // 区分表格是否为搜索模式
      if (this.state.search.type === 'productId') {
        delete request.pageSize;
      }
    }
    _product.list(request).then(
      res => {
        this.setState({
          tableData: res.list,
          pagination: {
            total: res.total,
            current: this.state.current, // 当前页数
            pageSize: this.state.pageSize // 当页数据条数
          },
          loading: false
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
        this.setState({
          tableData: [],
          loading: false
        });
      }
    );
  }
  // 查看商品详情
  view(id) {
    this.props.history.push('/product/detail/' + id);
  }
  // 编辑商品
  edit(id) {
    this.props.history.push('/product/save/' + id);
  }
  // 增加商品
  addProduct() {
    this.props.history.push('/product/save');
  }
  // 改变商品状态，上架 / 下架
  onSetProductStatus(info) {
    let newStatus = info.status == 1 ? 2 : 1,
      that = this,
      confrimTips = info.status == 1 ? '确定要下架该商品？' : '确定要上架该商品？';
    confirm({
      content: confrimTips,
      onOk() {
        _product
          .setProductStatus({
            productId: info.id,
            status: newStatus
          })
          .then(
            res => {
              _mutil.successTips(res.data);
              that.getTableData();
            },
            errMsg => {
              _mutil.errorTips(errMsg);
            }
          );
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }
  onTableChange(pagination, filters, sorter, extra) {
    if (pagination !== undefined) {
      this.setState(
        {
          current: pagination.current, // 数据改变时的 当前页数
          pageSize: pagination.pageSize // 数据改变时的 当页数据条数
        },
        () => {
          this.getTableData();
        }
      );
    }
  }
  // 设置搜索字段
  setSearchType(value) {
    if (this.state.search.type !== value) {
      this.setState({
        search: {
          type: value
        }
      });
    }
  }
  // 搜索
  toSearch(value) {
    let listType = value === '' ? 'list' : 'search';
    this.setState(
      {
        pageNum: 1,
        search: {
          value: value,
          type: this.state.search.type
        },
        listType: listType
      },
      () => {
        this.getTableData();
      }
    );
  }
  render() {
    return (
      <div className="product-wrapper">
        <PageTitle title="商品管理" />
        <Row>
          <Col span={24}>
            <Row type="flex" justify="space-between">
              <Col span={12}>
                <Select defaultValue={this.state.search.type} onChange={e => this.setSearchType(e)}>
                  <Option value="productId">按商品id查询</Option>
                  <Option value="productName">按商品名称查询</Option>
                </Select>
                &nbsp;&nbsp;
                <Search
                  placeholder="关键字"
                  enterButton="查询"
                  onSearch={value => this.toSearch(value)}
                  style={{ width: 200 }}
                />
              </Col>
              <Col span={2}>
                <Button type="primary" onClick={e => this.addProduct(e)}>
                  增加商品
                </Button>
              </Col>
            </Row>
            <br />
            <Table
              bordered
              onChange={e => this.onTableChange(e)}
              rowKey="id"
              size="small"
              loading={this.state.loading}
              pagination={this.state.pagination}
              dataSource={this.state.tableData}
              columns={this.state.columns}
            />
          </Col>
        </Row>
        <div>content</div>
      </div>
    );
  }
}
