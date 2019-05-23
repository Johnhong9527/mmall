import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
// import 'moment/locale/en-us';
import App from './App.jsx';

moment.locale('zh-cn');

ReactDOM.render(
	<LocaleProvider locale={zh_CN}>
		<App />
	</LocaleProvider>,
	document.getElementById('app')
);
