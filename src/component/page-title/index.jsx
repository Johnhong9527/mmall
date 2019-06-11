/*
 * @Author: Johnhong9527
 * @Date:   2019-05-25 21:51:40
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 09:57:42
 */
import React from 'react';
import './index.scss';
export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    document.title = this.props.title + '  - HAPPY MMALL';
  }
  render() {
    return <h1 className="page-header">{this.props.title}</h1>;
  }
}
