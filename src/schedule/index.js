import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import '../common/index.scss';
import App from './js/containers/App'
import * as serviceWorker from '../serviceWorker';
import {Provider} from 'react-redux';

import store from './js/store';

import {ConfigProvider} from 'antd';

import moment from 'moment';

import 'moment/locale/zh-cn';

import ZH_CN from 'antd/es/locale/zh_CN';

moment.locale('zh-cn');



ReactDOM.render(<Provider store={store}>

    <ConfigProvider locale={ZH_CN}>

        <App />

    </ConfigProvider>

</Provider>, document.getElementById('root'));

serviceWorker.register();