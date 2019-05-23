import * as React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import { Button, Row, Col,Pagination } from 'antd';
import './App.scss';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '飞鼠',
			age: 18
		};
	}

	heandleClick() {
		this.setState({
			age: this.state.age + 1
		});
	}

	onValueChange() {
		this.setState({
			age: this.state.age + 1
		});
	}

	render() {
		return (
			<div>
				<Row>
					<Pagination defaultCurrent={1} total={50} showSizeChanger />
				</Row>
				<Row>
					<Col span={12}>
						<h2>I am {this.state.name}</h2>
						<p>I am {this.state.age}</p>
						<div className="context">i am {this.state.name}</div>
						<Button
							onClick={e => {
								this.heandleClick(e);
							}}
						>
							加一岁
						</Button>
						<input
							type="text"
							onChange={e => {
								this.onValueChange(e);
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<div>
							<Button type="primary">Primary</Button>
							<Button>Default</Button>
							<Button type="dashed">Dashed</Button>
							<Button type="danger">Danger</Button>
							<Button type="link">Link</Button>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
