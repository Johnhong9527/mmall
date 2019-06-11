/*
 * @Author: Johnhong9527
 * @Date:   2019-06-10 11:15:03
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 15:43:43
 */
// ProductSavePage
import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Upload,
  Modal,
  Progress,
  message
} from 'antd';
import PageTitle from 'component/page-title/index.jsx';
import HNumber from 'component/h-number/index.jsx';
import Product from 'api/product.jsx';
import MUtil from 'util/mutil.jsx';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './index.scss';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;
const _product = new Product();
const _mutil = new MUtil();

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'save',
      categoryList: [],
      previewVisible: false,
      previewImage: '',
      filelist: [],
      subImages: [],
      // 富文本编辑器
      detail: ''
    };
    this.getCategoryList = this.getCategoryList.bind(this);
    this.mapPropsToFields = this.mapPropsToFields.bind(this);
    // this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    /*this.props.form.setFieldsValue({
      name: res.data.name,
      subtitle: res.data.subtitle,
      price: res.data.price,
      stock: res.data.stock
    });*/
    this.loadProduct();
    this.getCategoryList(0);
  }
  async loadProduct() {
    // console.log(this.props.match.params.pid);
    let getProduct = await _product.getProduct(this.props.match.params.pid);
    // console.log(getProduct.data.subtitle);
    this.props.form.setFieldsValue({
      name: getProduct.data.name,
      subtitle: getProduct.data.subtitle,
      price: getProduct.data.price,
      categoryId: ['12', '1231'],
      stock: getProduct.data.stock
    });
    const subImages = getProduct.data.subImages.split(',');
    const subImagesArr = subImages.map((item, index) => {
      // console.log(item);
      return {
        uid: index,
        name: getProduct.data.imageHost + item,
        status: 'done',
        url: getProduct.data.imageHost + item,
        thumbUrl: getProduct.data.imageHost + item
      };
    });
    this.setState({
      detail: getProduct.data.detail,
      filelist: [...subImagesArr]
    });
    console.log(getProduct.data.imageHost);
  }

  getCategoryList(parentCategoryId) {
    _product.getCategoryList(parentCategoryId).then(
      res => {
        if (parentCategoryId === 0) {
          res.data = res.data.slice(1150, 1200);
          // res.data = res.data.slice(0, 100);
          res.data.map(key => {
            key.isLeaf = false;
            return key;
          });
        }
        this.setState({
          categoryList: res.data
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }

  mapPropsToFields = props => {
    // console.log(props);
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      })
    };
  };

  onSelectChange(data) {
    // console.log(data);
  }

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    _product.getCategoryList(targetOption.id).then(
      res => {
        targetOption.loading = false;
        if (res.data.length > 0) {
          targetOption.children = res.data;
        }
        this.setState({
          options: [...this.state.categoryList]
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  };
  onCascaderChange(value, selectedOptions) {
    // console.log(value, selectedOptions);
    value.forEach(item => {
      if (item !== undefined) {
      }
    });
  }

  // 上传组件 handlePreview
  upHandlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  upCustomRequest({ file, onProgress, onSuccess }) {
    /*
    参考文章：
        https://blog.csdn.net/qq_24147051/article/details/76862073
        https://github.com/react-component/upload/blob/master/examples/customRequest.js
        */
    _product
      .uploadImage(
        {
          upload_file: file
        },
        {
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Number.parseInt(Math.round((loaded / total) * 100).toFixed(2)) }, file);
          }
        }
      )
      .then(res => {
        // console.log(res.data.uri);
        const url = {
          url: res.data.uri,
          uid: file.uid
        };
        if (this.state.subImages.indexOf(url) < 0) {
          this.setState({
            subImages: [...this.state.subImages, url]
          });
        }
        onSuccess();
      });
  }

  modalHandleCancel() {
    this.setState({ previewVisible: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, previewVisible, previewImage, filelist } = this.state;
    console.log(filelist);
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div className="product-save-wrapper">
        <PageTitle title="商品管理 -- 添加商品" />
        <Form {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
          <FormItem label="商品名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入商品名称!'
                },
                {
                  type: 'string',
                  message: '请输入标准的字符串!'
                }
              ]
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label="商品描述">
            {getFieldDecorator('subtitle', {
              rules: [
                {
                  required: true,
                  message: '请输入商品描述!'
                },
                {
                  type: 'string',
                  message: '请输入标准的字符串!'
                }
              ]
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label="所属分类">
            {getFieldDecorator('categoryId', {
              rules: [{ type: 'array', required: true, message: '情选择商品分类' }]
            })(
              <Cascader
                disabled={true}
                options={this.state.categoryList}
                ref={child => (this.child = child)}
                // onChange={e => this.onSelectChange(e)}
                loadData={this.loadData}
                onChange={e => this.onCascaderChange(e)}
                fieldNames={{ label: 'name', value: 'id' }}
                changeOnSelect
                notFoundContent
              />
            )}
          </FormItem>
          <FormItem label="商品价格">
            {getFieldDecorator('price', {
              rules: [{ required: true, message: '请输入商品价格！' }]
            })(<HNumber disabled={true} min={0} placeholder="价格" type="number" tips="元" />)}
          </FormItem>
          <FormItem label="商品库存">
            {getFieldDecorator('stock', {
              rules: [{ required: true, message: '请输入商品库存！' }]
            })(<HNumber disabled={true} min={0} placeholder="库存" type="number" tips="件" />)}
          </FormItem>
          <FormItem label="商品图片" {...editFormItemLayout}>
            <Upload
              // disabled={true}
              name="subImages"
              defaultFileList={filelist}
              // onPreview={e => this.upHandlePreview(e)}
              // onChange={e => this.upHandleChange(e)}
              listType="picture-card"
              // customRequest={e => this.upCustomRequest(e)}
              // action="http://adminv2.happymmall.com/manage/product/upload.do"
            >
              <div>
                {/*<Progress percent={30} />*/}
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
              </div>
            </Upload>
          </FormItem>
          <FormItem {...editFormItemLayout} label="商品详情">
            <div>{this.state.detail}</div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const ProductDetailPage = Form.create({ name: 'product-save' })(ProductDetail);
export default ProductDetailPage;
