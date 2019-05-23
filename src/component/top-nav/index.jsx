import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './index.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const menu = (
	<Menu>
		<Menu.Item>
			<Icon type="logout" />
			退出登录
		</Menu.Item>
	</Menu>
);
export default class TopNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark',
			current: 'mail',
			userName: 'admin'
		};
	}
	handleClick() {
		console.log('click ', e);
		this.setState({
			current: e.key
		});
	}
	print() {
		console.log(29);
	}
	render() {
		return (
			<Dropdown
				overlay={menu}
				onClick={e => {
					this.print(e);
				}}
			>
				<span style={{ color: 'white' }}>
					<Icon type="user" />
					&nbsp; 欢迎，{this.state.userName}
					<Icon type="down" />
				</span>
			</Dropdown>
		);
	}
}
