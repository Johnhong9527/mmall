import React from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  message,
  Row,
  Col
} from "antd";
import PageTitle from "component/page-title/index.jsx";
import Category from "api/category.jsx";
import MUtil from "util/mutil.jsx";
import "./index.scss";

const _category = new Category();
const _mutil = new MUtil();
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    };
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.parentCategoryId);
    this.loadCategoryList();
    // console.log(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(
        {
          parentCategoryId: this.props.match.params.categoryId || 0
        },
        () => {
          this.loadCategoryList();
        }
      );
    }
  }

  // 加载品类列表
  loadCategoryList() {
    _category.getCategory(this.state.parentCategoryId).then(
      res => {
        // console.log(res);
        this.setState({
          list: res
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  toChildren(id) {
    this.props.history.push("/product-category/index/" + id);
  }

  handleSave = row => {
    // console.log(row);
    const newData = [...this.state.list];
    const index = newData.findIndex(item => row.id === item.id);
    const oldName = row.name;
    if (oldName !== newData[index].name) {
      newData[index].name = row.name;
      this.setState({ list: newData }, () => {
        this.save(newData[index]);
      });
    }
  };

  save(info) {
    _category
      .setCategoryName({
        categoryId: info.id,
        categoryName: info.name
      })
      .then(
        res => {
          // console.log(res);
          message.success(res.message, 0.5);
        },
        err => {
          console.log(err);
        }
      );
  }
  add() {
    this.props.history.push(
      "/product-category/add" +
        (this.state.parentCategoryId > 0
          ? "/" + this.state.parentCategoryId
          : "")
    );
  }

  render() {
    const { list, parentCategoryId } = this.state;
    const _columns = [
      {
        title: "品类ID",
        dataIndex: "id",
        width: 150,
        key: "id"
      },
      {
        title: "品类名称",
        dataIndex: "name",
        key: "name",
        editable: true
      },
      {
        title: "操作",
        dataIndex: "createTime",
        key: "createTime",
        width: 250,
        render: (value, row, index) => {
          return row.parentId === 0 ? (
            <Button
              size="small"
              type="primary"
              onClick={e => this.toChildren(row.id)}
            >
              查看其子类
            </Button>
          ) : null;
        }

        /*render: (value, row, index) => {
          return (
            <span>
              {/!*<Button type="primary" size="small" onClick={e => this.save(row)}>
                修改名称
              </Button>*!/}
              &nbsp;
              {row.parentId === 0 ? (
                <Button size="small" onClick={e => this.toChildren(row.id)}>
                  查看其子类
                </Button>
              ) : null}
            </span>
          );
        }*/
      }
    ];
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = _columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div className="category-wrapper">
        <PageTitle title="品类管理" />
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" onClick={e => this.add(e)}>
              添加子类
            </Button>
          </Col>
        </Row>
        <Table
          size="small"
          title={() => "当前商品分类ID：" + parentCategoryId}
          bordered
          rowKey="id"
          components={components}
          columns={columns}
          dataSource={list}
        />
      </div>
    );
  }
}
