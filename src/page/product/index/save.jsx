/*
 * @Author: Johnhong9527
 * @Date:   2019-06-28 16:16:30
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-07-08 09:58:48
 */
import React from "react";
import {Form, Input, Icon, Button, Upload, Modal, message} from "antd";
import PageTitle from "component/page-title/index.jsx";
import HNumber from "component/h-number/index.jsx";
import CategorySelector from "component/category-selector/index.jsx";
import Product from "api/product.jsx";
import MUtil from "util/mutil.jsx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import "./index.scss";

const FormItem = Form.Item;
const _product = new Product();
const _mutil = new MUtil();

class ProductSavePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.match.params.pid ? this.props.match.params.pid : "",
      parentCategoryId: "",
      categoryId: "",
      name: "save",
      previewVisible: false,
      previewImage: "",
      0: [],
      subImages: [],
      // 富文本编辑器
      editorState: BraftEditor.createEditorState(null),
    };
    this.preview = this.preview.bind(this);
  }

  componentWillMount() {
    this.loadProduct();
  }

  loadProduct() {
    if (this.state.pid !== "") {
      _product.getProduct(this.state.pid).then(res => {
        const getProduct = res;

        //
        const subImages = getProduct.subImages !== "" ? getProduct.subImages.split(",") : "";
        const subImagesArr =
          subImages !== ""
            ? subImages.map((item, index) => {
              return {
                uid: index,
                name: getProduct.imageHost + item,
                status: "done",
                url: getProduct.imageHost + item,
                oldUrl: item,
                thumbUrl: getProduct.imageHost + item,
              };
            })
            : "";
        this.props.form.setFieldsValue({
          name: getProduct.name,
          subtitle: getProduct.subtitle,
          category: [getProduct.parentCategoryId, getProduct.categoryId],
          price: getProduct.price,
          stock: getProduct.stock,
          upload: subImagesArr,
          content: BraftEditor.createEditorState(getProduct.detail),
        });
        this.setState({
          // detail: getProduct.detail,
          filelist: [...subImagesArr],
          parentCategoryId: getProduct.parentCategoryId,
          categoryId: getProduct.categoryId,
        });
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let subImages = "";
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /*console.log(this.state.filelist);
        console.log(this.state.subImages);
        console.log(subImages);
        return;*/
        if (this.state.filelist !== undefined) {
          this.state.filelist.forEach(item => {
            if (item.oldUrl) {
              subImages += item.oldUrl + ",";
            }
            this.state.subImages.forEach((subItem, index) => {
              if (subItem.uid === item.uid) {
                subImages += subItem.url + (this.state.subImages.length === index + 1 ? "" : ",");
              }
            });
          });
        }

        // 去除字符串末尾逗号
        if (subImages.length > 0 && subImages[subImages.length - 1] === ",") {
          subImages = subImages.substring(0, subImages.length - 1);
        }
        _product
          .saveProduct({
            id: this.state.pid,
            categoryId: values.category[values.category.length - 1],
            name: values.name,
            subtitle: values.subtitle,
            subImages: subImages,
            detail: values.content.toRAW(),
            price: values.price,
            stock: values.stock,
            status: 1,
          })
          .then(
            res => {
              message.success(res, 0.5).then(() => {
                message.loading("返回商品列表页", 1).then(() => {
                  this.props.history.go(-1);
                });
              });
            },
            err => {
              console.log(err);
            },
          );
      }
    });
  }

  // 上传组件 handlePreview
  upHandlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  upCustomRequest({file, onProgress, onSuccess}) {
    /*
    参考文章：
        https://blog.csdn.net/qq_24147051/article/details/76862073
        https://github.com/react-component/upload/blob/master/examples/customRequest.js
        */
    _product
      .uploadImage(
        {
          upload_file: file,
        },
        {
          onUploadProgress: ({total, loaded}) => {
            onProgress(
              {
                percent: Number.parseInt(Math.round((loaded / total) * 100).toFixed(2)),
              },
              file,
            );
          },
        },
      )
      .then(res => {
        // console.log(res.uri);
        const url = {
          url: res.uri,
          uid: file.uid,
        };
        if (this.state.subImages.indexOf(url) < 0) {
          this.setState({
            subImages: [...this.state.subImages, url],
          });
        }
        onSuccess();
      });
  }

  modalHandleCancel() {
    this.setState({previewVisible: false});
  }

  upHandleChange({file, fileList, event}) {
    this.setState({
      filelist: [...fileList],
    });
  }

  // 富文本编辑器
  braftEditorHandleChange = editorState => {
    // console.log(editorState);
    // this.setState({ editorState })
  };

  // 富文本预览
  preview() {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  }

  buildPreviewHtml() {
    let dom = "";
    this.props.form.validateFieldsAndScroll((err, values) => {
      dom = `
      <!Doctype html>
      <html>
      <head>
      <title>Preview Content</title>
      <style>
      html,body{
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
        background-color: #f1f2f3;
      }
      .container{
        box-sizing: border-box;
        width: 1000px;
        max-width: 100%;
        min-height: 100%;
        margin: 0 auto;
        padding: 30px 20px;
        overflow: hidden;
        background-color: #fff;
        border-right: solid 1px #eee;
        border-left: solid 1px #eee;
      }
      .container img,
      .container audio,
      .container video{
        max-width: 100%;
        height: auto;
      }
      .container p{
        white-space: pre-wrap;
        min-height: 1em;
      }
      .container pre{
        padding: 15px;
        background-color: #f1f1f1;
        border-radius: 5px;
      }
      .container blockquote{
        margin: 0;
        padding: 15px;
        background-color: #f1f1f1;
        border-left: 3px solid #d1d1d1;
      }
      </style>
      </head>
      <body>
      <div class="container">${values.content.toHTML()}</div>
      </body>
      </html>
      `;
    });
    return dom;
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      autoCompleteResult,
      previewVisible,
      previewImage,
      filelist,
      categoryId,
      parentCategoryId,
      pid,
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 12},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 8},
      },
    };
    const editFormItemLayout = {
      labelCol: {
        xs: {span: 4},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 18},
        sm: {span: 18},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    // 富文本
    const extendControls = [
      {
        key: "custom-button",
        type: "button",
        text: "预览",
        onClick: this.preview,
      },
    ];
    return (
      <div className="product-save-wrapper">
        <PageTitle title={pid > 0 ? "商品管理 -- 修改商品" : "商品管理 -- 添加商品"}/>
        <Form {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
          <FormItem label="商品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称!",
                },
                {
                  type: "string",
                  message: "请输入标准的字符串!",
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem label="商品描述">
            {getFieldDecorator("subtitle", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述!",
                },
                {
                  type: "string",
                  message: "请输入标准的字符串!",
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem label="所属分类">
            {getFieldDecorator("category", {
              rules: [{type: "array", required: true, message: "请选择商品分类"}],
            })(<CategorySelector categoryId={categoryId} parentCategoryId={parentCategoryId}/>)}
          </FormItem>
          <FormItem label="商品价格">
            {getFieldDecorator("price", {
              rules: [{required: true, message: "请输入商品价格！"}],
            })(<HNumber min={0} placeholder="价格" type="number" tips="元"/>)}
          </FormItem>
          <FormItem label="商品库存">
            {getFieldDecorator("stock", {
              rules: [{required: true, message: "请输入商品库存！"}],
            })(<HNumber min={0} placeholder="库存" type="number" tips="件"/>)}
          </FormItem>
          <FormItem label="商品图片" {...editFormItemLayout}>
            {getFieldDecorator("upload", {
              valuePropName: "filelist",
              getValueFromEvent: this.normFile,
            })(
              <div>
                <Upload
                  name="subImages"
                  onPreview={e => this.upHandlePreview(e)}
                  fileList={filelist}
                  listType="picture-card"
                  onChange={e => this.upHandleChange(e)}
                  customRequest={e => this.upCustomRequest(e)}
                >
                  <div>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传图片</div>
                  </div>
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={e => this.modalHandleCancel(e)}>
                  <img alt="example" style={{width: "100%"}} src={previewImage}/>
                </Modal>
              </div>,
            )}
          </FormItem>
          <FormItem {...editFormItemLayout} label="商品详情">
            {getFieldDecorator("content", {
              validateTrigger: "onBlur",
              rules: [
                {
                  required: false,
                  validator: (_, value, callback) => {
                    if (value === undefined) {
                      callback("请输入正文内容");
                    } else {
                      callback();
                    }
                  },
                },
              ],
            })(<BraftEditor extendControls={extendControls} className="my-editor" placeholder="请输入正文内容"/>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button size={"large"} type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const ProductSave = Form.create({name: "product-save"})(ProductSavePage);
export default ProductSave;
