import React from 'react';
import { Select } from 'antd';
import Category from 'api/category.jsx';
import MUtil from 'util/mutil.jsx';
import './index.scss';
const { Option } = Select;
const _category = new Category();
const _mutil = new MUtil();
export default class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    };
    this.loadFirstCategory = this.loadFirstCategory.bind(this);
  }
  componentDidMount() {
    this.loadFirstCategory();
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候，直接不做处理
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    // 假如只有一级品类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      });
    }
    // 有两级品类
    else {
      this.setState(
        {
          firstCategoryId: nextProps.parentCategoryId,
          secondCategoryId: nextProps.categoryId
        },
        () => {
          parentCategoryIdChange && this.loadSecondCategory();
        }
      );
    }
  }
  // 加载一级分类
  loadFirstCategory() {
    _category.getCategory().then(
      res => {
        this.setState({
          firstCategoryList: res
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }
  // 加载二级分类
  loadSecondCategory() {
    _category.getCategory(this.state.firstCategoryId).then(
      res => {
        this.setState({
          secondCategoryList: res
        });
      },
      errMsg => {
        _mutil.errorTips(errMsg);
      }
    );
  }
  // 选择一级品类
  onFirstCategoryChange(value) {
    if (this.props.disabled) {
      return;
    }
    let newValue = value || 0;
    this.setState(
      {
        firstCategoryId: newValue,
        secondCategoryId: 0,
        secondCategoryList: []
      },
      () => {
        // 更新二级品类
        this.loadSecondCategory();
        this.onPropsCategoryChange();
      }
    );
  }
  // 选择二级品类
  onSecondCategoryChange(value) {
    if (this.props.disabled) {
      return;
    }
    let newValue = value || 0;
    this.setState(
      {
        secondCategoryId: newValue
      },
      () => {
        this.onPropsCategoryChange();
      }
    );
  }
  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断props里的回调函数存在
    let categoryChangable = typeof this.props.onChange === 'function';
    // 如果是有二级品类
    if (this.state.secondCategoryId) {
      categoryChangable && this.props.onChange([this.state.firstCategoryId, this.state.secondCategoryId]);
    }
    // 如果只有一级品类
    else {
      categoryChangable && this.props.onChange([this.state.firstCategoryId, 0]);
    }
  }
  render() {
    const { disabled = false } = this.props;
    const { firstCategoryId, secondCategoryId = '' } = this.state;
    return (
      <div className="category-selector-wrapper">
        <Select value={firstCategoryId} disabled={disabled} onChange={e => this.onFirstCategoryChange(e)}>
          <Option value="">请选择一级分类</Option>
          {this.state.firstCategoryList.map((category, index) => (
            <Option value={category.id} key={index}>
              {category.name}
            </Option>
          ))}
        </Select>
        {this.state.secondCategoryList.length > 0 ? (
          <Select value={secondCategoryId} disabled={disabled} onChange={e => this.onSecondCategoryChange(e)}>
            <Option value={0}>请选择二级分类</Option>
            {this.state.secondCategoryList.map((category, index) => (
              <Option value={category.id} key={index}>
                {category.name}
              </Option>
            ))}
          </Select>
        ) : null}
      </div>
    );
  }
}
