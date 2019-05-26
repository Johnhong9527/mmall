import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import User from 'api/user.jsx';
import MUtil from 'util/mutil.jsx';
// import axios from 'axios';
const _user = new User();
const _mutil = new MUtil();
import './index.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function onLogout() {
	_user.logout().then(
		res => {
			_mutil.removeStorage('userInfo');
			// window.location.href = '/login';
			_mutil.doLogin();
		},
		errMsg => {
			_mutil.errorTips(errMsg);
		}
	);
}
const menu = (
	<Menu onClick={e => onLogout(e)}>
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
			userName: _mutil.getStorage('userInfo').username || ''
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
			<Dropdown overlay={menu}>
				<span style={{ color: 'white' }}>
					<Icon type="user" />
					&nbsp; {this.state.userName ? <span>欢迎，{this.state.userName}</span> : <span>欢迎您</span>}
					<Icon type="down" />
				</span>
			</Dropdown>
		);
	}
}
