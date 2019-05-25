import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
// import 'moment/locale/en-us';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import './App.scss';
moment.locale('zh-cn');
// Components
import HLayout from 'component/layout/index.jsx';
// Page
import Home from 'page/home/index.jsx';
import User from 'page/user/index.jsx';
import Login from 'page/login/index.jsx';
import Product from 'page/product/index.jsx';
import Order from 'page/order/index.jsx';
import ProductCategory from 'page/product/category.jsx';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route
						path="/"
						render={props => (
							<HLayout>
								<Switch>
									<Route exact path="/" component={Home} />
									<Route path="/home" component={Home} />
									<Route path="/user" component={User} />
									<Route path="/product" component={Product} />
									<Route path="/order" component={Order} />
									<Route path="/product-category" component={ProductCategory} />
								</Switch>
							</HLayout>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(
	<LocaleProvider locale={zh_CN}>
		<App />
	</LocaleProvider>,
	document.getElementById('app')
);
