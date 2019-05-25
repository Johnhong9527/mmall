import React from 'react';
import { Menu, Icon, Button, Switch } from 'antd';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
// import { BrowserRouter as Link } from 'react-router-dom';
import './index.scss';
const SubMenu = Menu.SubMenu;
// function Logo(props) {
// 	const { collapsed } = props;
// 	console.log('collapsed');
// 	if (props) {
// 		return <div>123</div>;
// 	} else {
// 		return <div>456</div>;
// 	}
// }
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
			myTextInput: ''
		};
	}
	handleClick(e) {
		this.setState({
			current: e.key
		});
		console.log(this.props.history.location.pathname);
	}
	submenuClick(e) {
		// this.setState({
		// 	current: e.key
		// });
	}
	componentWillMount() {
		if (this.props.location.pathname !== '/') {
			console.log(this.props.location.pathname.split('-')[0]);
			this.setState({
				current: this.props.location.pathname,
				// defaultOpen: this.props.location.pathname.split('-')[0].replace('/', '')
			});
		}

		// console.log(30);
	}
	componentDidMount() {}
	// print(){
	// 	console.log(31);
	// }
	// 组件的props发生变化，触发该函数
	// componentDidUpdate(prevProps) {
	// 	// 监听到数据变化，设置路由数据
	// 	this.print();
	// 	// console.log(this.state.current);
	// }
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
