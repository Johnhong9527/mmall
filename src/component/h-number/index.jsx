/*
 * @Author: Johnhong9527
 * @Date:   2019-06-11 09:57:06
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 13:57:26
 */
import React from 'react';
import { InputNumber } from 'antd';
import './index.scss';
export default class HNumber extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="unit-wrapper">
        <InputNumber
          value={this.props.value}
          disabled={this.props.disabled}
          min={this.props.min}
          placeholder={this.props.placeholder}
          type={this.props.type}
        />
        <span className="unit">{this.props.tips}</span>
      </div>
    );
  }
}
