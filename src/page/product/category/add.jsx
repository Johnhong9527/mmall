import React from "react";
import {
  Table,
  Button,
  Input,
  message,
  Row,
  Col,
  Form,
  AutoComplete,
  Select
} from "antd";
import PageTitle from "component/page-title/index.jsx";
import Category from "api/category.jsx";
import MUtil from "util/mutil.jsx";
import "./index.scss";

const _category = new Category();
const _mutil = new MUtil();
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
class CategoryAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      parentCategoryId: Number.parseInt(this.props.match.params.categoryId) || 0
    };
    this.loadCategoryList = this.loadCategoryList.bind(this);
  }

  componentWillMount() {
    this.loadCategoryList();
  }

  // 加载品类列表
  loadCategoryList() {
    _category.getCategory().then(
      res => {
        this.setState(
          {
            categoryList: [
              {
                id: 0,
                name: "根品类"
              },
              ...res.data
            ]
          },
          () => {
            console.log(typeof this.state.parentCategoryId);
            this.props.form.setFieldsValue({
              select: this.state.parentCategoryId
            });
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      _category
        .addCategory({
          parentId: values.select,
          categoryName: values.name
        })
        .then(
          res => {
            message.success(res.msg, 0.5).then(() => {
              this.props.history.push(
                "/product-category/index" +
                  (this.state.parentCategoryId > 0
                    ? "/" + this.state.parentCategoryId
                    : "")
              );
            });
            // console.log(res);
          },
          err => {
            console.log(err);
          }
        );
    });
    console.log(this.state.categoryList);
  }
  render() {
    const { categoryList, parentCategoryId } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 3
        }
      }
    };
    return (
      <div className="category-wrapper">
        <PageTitle title="品类管理 -- 添加品类" />
        <Form {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
          <Form.Item label="所属品类">
            {getFieldDecorator("select", {
              rules: [
                { required: true, message: "Please select your country!" }
              ]
            })(
              <Select
                placeholder="Please select a country"
                onChange={e => this.handleChange(e)}
              >
                {categoryList.map((category, index) => {
                  return (
                    <Option value={category.id} key={index}>
                      根品类{category.id !== 0 ? "/" + category.name : ""}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="品类名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input placeholder="请输入品类名称" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const CategoryAdd = Form.create({ name: "category-add-page" })(CategoryAddPage);
export default CategoryAdd;
