import React from 'react';
import { Menu, Icon, Button, Switch } from 'antd';
import './index.scss';
const SubMenu = Menu.SubMenu;
export default class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark',
			current: '0',
			myTextInput: ''
		};
	}
	handleClick(e) {
		console.log(e);
		this.setState({
			current: e.key
		});
	}
	submenuClick(e) {
		// this.setState({
		// 	current: e.key
		// });
	}
	componentDidMount() {
		this.setState({
			current: '1'
		});
	}
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
					<span>HAPPY</span> MMALL
				</div>
				<Menu
					theme={this.state.theme}
					onClick={e => {
						this.handleClick(e);
					}}
					style={{ width: 256 }}
					defaultSelectedKeys={['1']}
					selectedKeys={[this.state.current]}
					mode="inline"
				>
					<Menu.Item key="1">
						<Icon type="dashboard" />
						<span>首页</span>
					</Menu.Item>
					<SubMenu
						key="2"
						onTitleClick={e => {
							this.submenuClick(e);
						}}
						title={
							<span>
								<Icon type="unordered-list" />
								<span>商品</span>
							</span>
						}
					>
						<Menu.Item key="2">商品管理</Menu.Item>
						<Menu.Item key="3">品类管理</Menu.Item>
					</SubMenu>
					<SubMenu
						key="4"
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
						<Menu.Item key="4">订单管理</Menu.Item>
					</SubMenu>

					<SubMenu
						key="5"
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
						<Menu.Item key="5">用户列表</Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}
}
