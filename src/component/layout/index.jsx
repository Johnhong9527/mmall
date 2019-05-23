import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

export default class HLayout extends React.Component {
	render() {
		return (
			<div id="wrapper">
				<Layout theme={'light'}>
					<Sider
						style={{
							overflow: 'auto',
							height: '100vh',
							position: 'fixed',
							left: 0
						}}
					>
						<SideNav />
					</Sider>
					<Layout>
						<Header>
							<TopNav />
						</Header>
						<Content>{this.props.children}</Content>
						<Footer>Footer</Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}
