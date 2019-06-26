/*
 * @Author: Johnhong9527
 * @Date:   2019-06-10 11:15:03
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-13 14:06:03
 */
// ProductSavePage
import React from "react";
import { Form, Input, Select, AutoComplete, Upload, Modal, Empty } from "antd";
import PageTitle from "component/page-title/index.jsx";
import HNumber from "component/h-number/index.jsx";
import Product from "api/product.jsx";
import MUtil from "util/mutil.jsx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import "./index.scss";

const FormItem = Form.Item;
const _product = new Product();
const _mutil = new MUtil();

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "save",
      categoryList: [],
      previewVisible: false,
      previewImage: "",
      filelist: [],
      subImages: [],
      // 富文本编辑器
      detail: "",
      // 分类
      firstCategory: "",
      secondCategory: ""
    };
    this.mapPropsToFields = this.mapPropsToFields.bind(this);
    this.loadProduct = this.loadProduct.bind(this);
    this.loadFirstCategory = this.loadFirstCategory.bind(this);
    this.loadSecondCategory = this.loadSecondCategory.bind(this);
  }

  componentWillMount() {
    this.loadProduct();
  }

  loadProduct() {
    _product.getProduct(this.props.match.params.pid).then(res => {
      const getProduct = res.data;
      this.props.form.setFieldsValue({
        name: getProduct.name,
        subtitle: getProduct.subtitle,
        price: getProduct.price,
        stock: getProduct.stock
      });
      const subImages =
        getProduct.subImages !== "" ? getProduct.subImages.split(",") : "";
      const subImagesArr =
        subImages !== ""
          ? subImages.map((item, index) => {
              return {
                uid: index,
                name: getProduct.imageHost + item,
                status: "done",
                url: getProduct.imageHost + item,
                thumbUrl: getProduct.imageHost + item
              };
            })
          : "";
      this.setState(
        {
          detail: getProduct.detail,
          filelist: [...subImagesArr]
        },
        () => {
          this.loadFirstCategory(getProduct);
        }
      );
    });
  }
  // 加载一级分类
  async loadFirstCategory(product) {
    try {
      let category;
      category = await _product.getCategoryList(0);
      category.data.forEach(key => {
        if (key.id === product.parentCategoryId) {
          this.setState(
            {
              firstCategory: key
            },
            () => {
              if (product.parentCategoryId > 0) {
                this.loadSecondCategory(
                  product.parentCategoryId,
                  product.categoryId
                );
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
      _mutil.errorTips(err.message);
    }
  }
  // 加载二级分类
  async loadSecondCategory(parentCategoryId, categoryId) {
    try {
      let category;
      category = await _product.getCategoryList(parentCategoryId);
      category.data.forEach(key => {
        if (key.id === categoryId) {
          this.setState({
            secondCategory: key
          });
        }
      });
    } catch (err) {
      console.log(err);
      _mutil.errorTips(err.message);
    }
  }

  mapPropsToFields = props => {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      })
    };
  };

  // 上传组件 handlePreview
  upHandlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  modalHandleCancel() {
    this.setState({ previewVisible: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, filelist } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 }
      }
    };
    const editFormItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 }
      }
    };
    return (
      <div className="product-save-wrapper">
        <PageTitle title="商品管理 -- 添加商品" />
        <Form {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
          <FormItem label="商品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称!"
                },
                {
                  type: "string",
                  message: "请输入标准的字符串!"
                }
              ]
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label="商品描述">
            {getFieldDecorator("subtitle", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述!"
                },
                {
                  type: "string",
                  message: "请输入标准的字符串!"
                }
              ]
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label="所属分类">
            <div>
              {`${this.state.firstCategory.name}/${this.state.secondCategory.name}`}
            </div>
          </FormItem>
          <FormItem label="商品价格">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入商品价格！" }]
            })(
              <HNumber
                disabled={true}
                min={0}
                placeholder="价格"
                type="number"
                tips="元"
              />
            )}
          </FormItem>
          <FormItem label="商品库存">
            {getFieldDecorator("stock", {
              rules: [{ required: true, message: "请输入商品库存！" }]
            })(
              <HNumber
                disabled={true}
                min={0}
                placeholder="库存"
                type="number"
                tips="件"
              />
            )}
          </FormItem>
          <FormItem label="商品图片" {...editFormItemLayout}>
            {getFieldDecorator("upload", {
              valuePropName: "filelist",
              getValueFromEvent: this.normFile
            })(
              filelist.length > 0 ? (
                <div>
                  <Upload
                    disabled={true}
                    name="subImages"
                    onPreview={e => this.upHandlePreview(e)}
                    fileList={filelist}
                    listType="picture-card"
                  />
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={e => this.modalHandleCancel(e)}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              ) : (
                <span>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </span>
              )
            )}
          </FormItem>
          <FormItem {...editFormItemLayout} label="商品详情">
            {this.state.detail !== "" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: BraftEditor.createEditorState(
                    this.state.detail
                  ).toHTML()
                }}
              ></div>
            ) : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const ProductDetailPage = Form.create({ name: "product-save" })(ProductDetail);
export default ProductDetailPage;
