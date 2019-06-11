import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import axios from 'axios';
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
import UserPage from 'page/user/index.jsx';
import Login from 'page/login/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Order from 'page/order/index.jsx';
import Error from 'page/error/index.jsx';

axios.defaults.baseURL = process.env.BASE_URL;
class App extends React.Component {
	render() {
		let LayoutRouter = (
			<HLayout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/user" component={UserPage} />
					<Route path="/product" component={ProductRouter} />
					<Route path="/order" component={Order} />
					<Route path="/product-category" component={ProductRouter} />
					<Route component={Error} />
				</Switch>
			</HLayout>
		);
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" render={props => LayoutRouter} />
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
