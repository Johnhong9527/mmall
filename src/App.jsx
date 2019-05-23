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

class App extends React.Component {
	render() {
		return (
			<Router>
				<HLayout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Redirect from="*" to="/" />
					</Switch>
				</HLayout>
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
