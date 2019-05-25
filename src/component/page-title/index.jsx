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
