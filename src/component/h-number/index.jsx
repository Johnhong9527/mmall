import React from "react";
import { InputNumber } from "antd";
import "./index.scss";
export default class HNumber extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      onChange,
      value = "",
      type = "tet=xt",
      placeholder = "",
      disabled = false,
      min = "",
      tips = "元"
    } = this.props;
    return (
      <div className="unit-wrapper">
        <InputNumber
          value={value}
          onChange={e => onChange(e)}
          disabled={disabled}
          min={min}
          placeholder={placeholder}
          type={type}
        />
        <span className="unit">{tips}</span>
      </div>
    );
  }
}
