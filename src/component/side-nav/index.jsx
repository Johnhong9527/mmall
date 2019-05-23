import React from 'react';
import { Menu, Icon, Button, Switch } from 'antd';
import './index.scss';
const SubMenu = Menu.SubMenu;
export default class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark',
			current: '0'
		};
	}
	handleClick(e) {
		console.log('click ', e);
		this.setState({
			current: e.key
		});
	}
	render() {
		return (
			<div id="SideNav">
				<div className="logo" />
				<Menu
					theme={this.state.theme}
					onClick={e => {
						this.handleClick(e);
					}}
					defaultOpenKeys={['0']}
					selectedKeys={[this.state.current]}
					mode="inline"
				>
					<Menu.Item key="0">
						<Icon type="pie-chart" />
						<span>Option 1</span>
					</Menu.Item>
					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="mail" />
								<span>Navigation One</span>
							</span>
						}
					>
						<Menu.Item key="1">Option 1</Menu.Item>
						<Menu.Item key="2">Option 2</Menu.Item>
						<Menu.Item key="3">Option 3</Menu.Item>
						<Menu.Item key="4">Option 4</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="appstore" />
								<span>Navigtion Two</span>
							</span>
						}
					>
						<Menu.Item key="5">Option 5</Menu.Item>
						<Menu.Item key="6">Option 6</Menu.Item>
						<SubMenu key="sub3" title="Submenu">
							<Menu.Item key="7">Option 7</Menu.Item>
							<Menu.Item key="8">Option 8</Menu.Item>
						</SubMenu>
					</SubMenu>
				</Menu>
			</div>
		);
	}
}
