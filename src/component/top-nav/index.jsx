import React from 'react';
import { Menu, Icon } from 'antd';
import './index.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class TopNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark',
			current: 'mail'
		};
	}
	handleClick() {
		console.log('click ', e);
		this.setState({
			current: e.key
		});
	}
	render() {
		return (
			<div id="TopNav">
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
					<Menu.Item key="1">nav 1</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</div>
		);
	}
}
