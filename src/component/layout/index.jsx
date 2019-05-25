import React from 'react';
import { Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';
import HBreadcrumb from 'component/h-breadcrumb/index.jsx';

export default class HLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={260} collapsible collapsed={this.state.collapsed}>
          <SideNav collapsed={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            <TopNav />
          </Header>
          <Content>
            {/* <HBreadcrumb /> */}
            {this.props.children}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
