import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';
import HBreadcrumb from 'component/h-breadcrumb/index.jsx';

export default class HLayout extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={260}
        >
          <SideNav />
        </Sider>
        <Layout>
          <Header>
            <TopNav />
          </Header>
          <Content>
            <HBreadcrumb />
            {this.props.children}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
