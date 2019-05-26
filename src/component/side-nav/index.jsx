import React from 'react';
import { Menu, Icon, Button, Switch } from 'antd';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import MUtil from 'util/mutil.jsx';

import './index.scss';
const SubMenu = Menu.SubMenu;
const _mutil = new MUtil();
class Logo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (this.props.collapsed) {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<text x="27" y="40">
						<tspan fill="#FFF">M</tspan>
					</text>
				</svg>
			);
		} else {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<text x="20" y="40">
						<tspan fill="#2dafcb">HAPPY</tspan> <tspan fill="#fff">MMALL</tspan>
					</text>
				</svg>
			);
		}
	}
}
class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark',
			current: '/',
			// defaultOpen: 'product',
			myTextInput: '',
			userInfo: _mutil.getStorage('userInfo') || ''
		};
	}
	handleClick(e) {
		const pathname = this.props.history.location.pathname;
		this.setState({
			current: e.key
		});

		if (pathname !== '/' && this.state.userInfo === '') {
			_mutil.doLogin();
		}
	}

	componentWillMount() {
		if (this.props.location.pathname !== '/') {
			if (this.state.userInfo === '') {
				_mutil.doLogin();
			}
			// console.log(this.props.location.pathname.split('-')[0]);
			this.setState({
				current: this.props.location.pathname
			});
		}
	}
	render() {
		return (
			<div id="SideNav">
				<div className="logo">
					<Logo collapsed={this.props.collapsed} />
				</div>
				<Menu
					theme={this.state.theme}
					onClick={e => {
						this.handleClick(e);
					}}
					// defaultOpenKeys={[this.state.defaultOpen]}
					// defaultSelectedKeys={['4']}
					selectedKeys={[this.state.current]}
					// mode="inline"
				>
					<Menu.Item key="/">
						<Icon type="dashboard" />
						<span>首页</span>
						<Link to="/" />
					</Menu.Item>
					<SubMenu
						key="product"
						title={
							<span>
								<Icon type="unordered-list" />
								<span>商品</span>
							</span>
						}
					>
						<Menu.Item key="/product">
							<span>商品管理</span>
							<Link to="/product" />
						</Menu.Item>

						<Menu.Item key="/product-category">
							<span>品类管理</span>
							<Link to="/product-category" />
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="order"
						onTitleClick={e => {
							this.submenuClick(e);
						}}
						title={
							<span>
								<Icon type="appstore" />
								<span>订单</span>
							</span>
						}
					>
						<Menu.Item key="/order">
							<span>订单管理</span>
							<Link to="/order" />
						</Menu.Item>
					</SubMenu>

					<SubMenu
						key="user"
						onTitleClick={e => {
							this.submenuClick(e);
						}}
						title={
							<span>
								<Icon type="user" />
								<span>用户</span>
							</span>
						}
					>
						<Menu.Item key="/user">
							<span>用户列表</span>
							<Link to="/user" />
						</Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}
}
export default withRouter(SideNav);
